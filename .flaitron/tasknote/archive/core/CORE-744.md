---
title: skill-frontmatter-yaml
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: []
touches:
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/commands/ft-audit.md
  - claude/commands/ft-release.md
  - claude/commands/ft-file-followup.md
  - claude/commands/ft-epic-discovery.md
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - cursor/AGENTS-snippet.md
---

# CORE-744 | skill-frontmatter-yaml

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Make every shipped skill/command frontmatter block parse as YAML, and add a seeded `tools/drift-checks.sh` guard so an unquoted `: ` or a leading flow indicator cannot return.

## ✅ Acceptance

- [x] The five named frontmatter blocks parse as YAML — js-yaml load over every tracked `.md` frontmatter outside `.flaitron/tasknote/archive/` prints no `FAIL`
- [x] Quoting changes no flag set Pairs B/J/M read (single quotes, not double — their `"…"` strip would blank a double-quoted description) — `bash tools/drift-checks.sh pair_b pair_j pair_m`
- [x] New `skill_frontmatter_yaml` check passes on the repo — `bash tools/drift-checks.sh skill_frontmatter_yaml`
- [x] It has a seeded-drift case and a `VACUOUS` floor — `node --test tools/drift-checks.test.mjs`
- [x] Every drift check still passes — `bash tools/drift-checks.sh`
- [x] `cursor/AGENTS-snippet.md` no longer claims a repair that had not happened; names the guard — `judgment` (prose accuracy)

## 🧩 Subtasks

- [x] Single-quote the four `description:` scalars and the `argument-hint:` scalar (+ `ft-epic-discovery.md`'s `[--deep]` hint — Implementation Notes)
- [x] Add `skill_frontmatter_yaml` to `tools/drift-checks.sh` (header roster line + function)
- [x] Add its seeded case to `tools/drift-checks.test.mjs`
- [x] Correct the repair claim in `cursor/AGENTS-snippet.md`
- [x] Run the verify set

## 🔗 Related

- Surfaced by audit-docs 2026-10-08 (Finding #2, High).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** A js-yaml parse of every tracked `.md` frontmatter reproduces exactly the five failures the row names (all `bad indentation of a mapping entry`), and nothing else outside the archive.

- [x] Read relevant source files — the five frontmatter blocks, `cursor/AGENTS-snippet.md` §"Forking skills — the description must be valid YAML", `tools/drift-checks.sh` (header shape rules, `final_newline`, `sidequest_orphan`, Pairs B/J/M, dispatcher), `tools/drift-checks.test.mjs`

- [x] **Best Practices Review** — the guard follows the file's own shape rules: one column-0 function with a `#` title line, `bad=` accumulator, `n` counter with a `VACUOUS` floor, bash 3.2, one seeded case in the self-test.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`) grepped for the snippet's YAML rule and for `drift-checks.sh`; the CORE-741/742 hits are the newest drift-check additions (shape precedent only). No note records the "four upstream bodies … repaired" fix the snippet asserts.

- [x] **Drift check** — the PLAN line's five paths and two defect shapes match current code exactly. The snippet's claim ("Four upstream skill bodies carried this defect until it was measured in live Cursor sessions and repaired") is the drift the row calls out.

- [x] No clarifications needed (--fast). Assumptions: (1) the guard scopes to the shipped skill/command surfaces — `claude/skills/*/SKILL.md`, `claude/commands/*.md`, `codex/skills/*/SKILL.md`, `.flaitron/audit-overlay/SKILL.md` — not tasknotes or templates; (2) a bash line heuristic, not a YAML parser — drift-checks is zero-dependency, and every frontmatter line in scope is a one-line `key: value`; (3) single quotes, because Pairs B/J/M strip `"…"` segments before extracting flags.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **Failure shapes.** `ft-audit` (skill + command) and `ft-close-epic`: `Domains: general` / `present: the audit` — `: ` inside a plain scalar opens a nested mapping. `ft-release` command: `single feat: commit`. `ft-file-followup` command: `argument-hint: [TASK-ID] [--park …]` — a leading `[` opens a flow sequence, and the text after its `]` is a parse error.
- **Quote choice is load-bearing.** Pairs B, J and M run `sed -E 's/"[^"]*"//g'` on the `description:` line before extracting `--flags`. A double-quoted `ft-close-epic` description would strip to nothing and lose `--unattended` from Pair B's comparison. None of the five values contains `'`, so single quotes need no escaping.
- **Guard rule.** Inside the leading `---` block of each in-scope file, every line must be `key: value`; an unquoted value must not contain `: ` or ` #` (the latter silently truncates — a comment), and must not start with a YAML indicator (`[ { & * ! | > % @` or a backtick). Any other line shape (block scalar, continuation) is itself a finding, which keeps the line heuristic sound for the whole block.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing check shape (`final_newline` / `sidequest_orphan`: `#` title line, `bad=` / `n` / `VACUOUS` floor) and the self-test's `CASES` table

- [x] **Minimal refactor gate** — no refactor; the header's source-rule sentence gained one clause for the new check

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — seeded case `skill_frontmatter_yaml` (undoes the `ft-close-epic` quoting)

**Implementation Notes:**

- Quoted five scalars with single quotes. `claude/commands/ft-audit.md`'s description holds `domain's`, written `domain''s` — the first pass missed it and parsed wrong; the guard's single-quote rule now catches exactly that.
- **Sixth file, beyond the row.** The guard flagged `claude/commands/ft-epic-discovery.md`'s `argument-hint: [--deep]`: valid YAML, but it loads as a one-item list where every other hint is a string. Quoted it too (`touches:` updated) rather than carve a whole-line-flow-sequence exception into the rule.
- `skill_frontmatter_yaml` lands between `sidequest_orphan` and `pair_b`. Scope: `claude/skills/*/SKILL.md`, `claude/commands/*.md`, `codex/skills/*/SKILL.md`, `.flaitron/audit-overlay/SKILL.md`. Synthetic probe (scratch tree) flagged exactly the bad shapes: unescaped `'` in single quotes, unclosed quote, ` #`, trailing `:`, leading backtick / `{`, bare `'`, an indented continuation line; passed `''`-escaped, double-quoted and plain text with `- ` / `,`.
- `cursor/AGENTS-snippet.md`: the "four bodies … repaired" sentence replaced with the quoting rule (single quotes, doubled apostrophe, leading `[`) and a pointer to the check.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `bash -n` + shellcheck (no finding in the new function's lines)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after the review fixes):

- js-yaml load over every tracked `.md` frontmatter outside the archive (scratch `yamlscan.cjs`) → 0 `FAIL` lines (5 before)
- `bash tools/drift-checks.sh pair_b pair_j pair_m skill_frontmatter_yaml` → 0
- `bash tools/drift-checks.sh` → 0 (17 checks ok)
- `node --test tools/drift-checks.test.mjs` → 0 (19 pass, 0 fail; includes the coverage + floor tests)
- `bash -n tools/drift-checks.sh` → 0; `shellcheck tools/drift-checks.sh` → no finding in the new lines (pre-existing SC2016 infos elsewhere)
- Snippet accuracy — `judgment`: the repair claim is gone; the guidance names the rule and the check.

External review (`/code-review medium`, working-tree diff) — 7 findings, all **notes** graded against Acceptance (the guard exists, passes, is seeded):

1. Leading `- ` / `? ` passed the check, fails js-yaml → **fixed** (added to the indicator set; `-x` / `--fast` / `?x` still pass).
2. Double-quoted interior unchecked (`"a\qb"`, `"a" b"`) → **fixed** (no inner `"` or `\` in a double-quoted value; documented as stricter than YAML).
3. Tab before `#` truncates unflagged → **fixed** (tab variants of ` #` and `: `).
4. Glob scope narrower than the js-yaml sweep → **kept**: the guard targets the shipped skill/command surfaces this row is about (Discovery assumption 1); templates and tasknotes carry list-valued YAML the line rule would reject.
5. `touches:` / Subtasks omitted the sixth file → **fixed** (already in `touches:`; Subtasks line amended).
6. Check comment said "five blocks" → **fixed** (names the `[--deep]` list case).
7. Snippet named only `: ` and `[` → **fixed** (adds ` #`, trailing `:`, other leading indicators, "when unsure, quote").

Re-probe in a scratch tree confirmed findings 1–3's inputs now fail and valid shapes pass; full set above re-run green.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `cursor/AGENTS-snippet.md`: updated (this task's deliverable). Every other entry: no change — none names the frontmatter rule or enumerates drift checks (`AGENTS.md` §Validation says "among others").

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A; the rule now lives in the check and the snippet.

**Final Summary:**

Changed: five frontmatter scalars single-quoted (`claude/skills/{ft-audit,ft-close-epic}/SKILL.md`, `claude/commands/{ft-audit,ft-release,ft-file-followup}.md`) plus `claude/commands/ft-epic-discovery.md`'s list-loading `[--deep]` hint; new `skill_frontmatter_yaml` check in `tools/drift-checks.sh` with its seeded case in `tools/drift-checks.test.mjs`; `cursor/AGENTS-snippet.md`'s false repair claim replaced by the quoting rule and a pointer to the check. Verification: all drift checks + 19/19 self-tests green; zero live frontmatter YAML failures. Refactors: none. `touches:` reconciliation: `git diff --name-only` = the 9 declared paths (tasknote itself aside), no undeclared path. Maintainability: the defect class now fails CI's `drift` job instead of surfacing only in a live Cursor session.

**Archived:** 2026-10-08
