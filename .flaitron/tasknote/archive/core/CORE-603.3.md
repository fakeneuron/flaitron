---
title: audit-context-fold
status: completed
tags: []
created: 2026-09-17
due:
related-tasks: [CORE-EPIC-603, CORE-603.1, CORE-603.2, CORE-603.4]
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
touches:
  - claude/skills/ft-audit/passes/context.md
  - claude/skills/ft-audit/SKILL.md
  - claude/commands/ft-audit.md
  - codex/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit-context/SKILL.md
  - claude/commands/ft-audit-context.md
  - codex/skills/ft-audit-context/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-new-project/SKILL.md
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - templates/audit-overlay-template.md
  - AGENTS.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - SPEC/layout.md
  - SPEC/unattended-candidacy.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
blocked-by:
  - CORE-603.2
---

# CORE-603.3 | audit-context-fold

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-603]]

## 🎯 Goal

Fold `ft-audit-context`'s four passes into `ft-audit` as a `context` domain (`passes/context.md`), retire the standalone skill across its three shipped paths and every roster site, and repoint the docs that recommended it at `/ft-audit context`.

## ✅ Acceptance

- [x] A1 `passes/context.md` exists with the sibling shape (attribution slug, Scope & rubric hints, The 5 passes, Severity guide, Specialist additions) and no forker placeholders — `test -f claude/skills/ft-audit/passes/context.md && for h in 'Attribution slug' 'Scope & rubric hints' 'The 5 passes' 'Severity guide' 'Specialist additions'; do grep -q "$h" claude/skills/ft-audit/passes/context.md || echo "MISSING $h"; done; ! grep -q -e '<[^>]*>' -e '_(forker:' claude/skills/ft-audit/passes/context.md` prints nothing
- [x] A2 The three shipped `ft-audit-context` paths are gone — `test ! -e claude/skills/ft-audit-context -a ! -e claude/commands/ft-audit-context.md -a ! -e codex/skills/ft-audit-context`
- [x] A3 The `context` token is registered on every surface that enumerates the domain set — `for f in claude/skills/ft-audit/SKILL.md claude/commands/ft-audit.md codex/skills/ft-audit/SKILL.md claude/skills/ft-audit-repo/SKILL.md templates/audit-overlay-template.md docs/GLOSSARY.md docs/MIGRATION.md; do grep -q 'context' "$f" || echo "MISSING $f"; done` prints nothing, and `git grep -n -i -e 'seven domain' -e 'seven-file' -e 'all seven' -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!docs/VERSION-HISTORY.md'` prints nothing
- [x] A4 No live `ft-audit-context` / `audit-context` reference remains outside the archive, `PLAN-ARCHIVE.md`, `docs/VERSION-HISTORY.md`, `docs/CONTEXT-BUDGET.md` (dated measurement, re-measured at release), the `docs/MIGRATION.md` retired-skills row, and the epic's own PLAN.md rows — `git grep -n -e 'ft-audit-context' -e 'audit-context' -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!docs/VERSION-HISTORY.md' ':!docs/CONTEXT-BUDGET.md' ':!.flowtron/tasknote/CORE-603.3.md' | grep -v -e 'MIGRATION.md:.*| v5' -e 'PLAN.md:.*-603'` prints nothing
- [x] A5 `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains an `ft-audit-context` row naming `/ft-audit context` — `grep -q '| \`ft-audit-context\` | v5' docs/MIGRATION.md`
- [x] A6 The §1.7 / §3.8 recommendations, `ft-new-project` Step 4, and `SPEC/unattended-candidacy.md`'s surfaces table point at `/ft-audit context` — `grep -c 'ft-audit context' docs/MIGRATION.md` ≥ 3 (row + two recommendations), `grep -q 'ft-audit context' claude/skills/ft-new-project/SKILL.md`, and `! grep -q 'ft-audit-context' SPEC/unattended-candidacy.md`
- [x] A7 Shipped-skill parity and the symlink-roster derivation in `step-7.1-standing-checks.md` print nothing (exclusion list shrunk by one) — run the CI `drift` job's parity step + the four `diff -u` blocks; Pair N loop prints nothing
- [x] A8 Local self-wiring check passes after the two gitignored `.claude/` links are removed — `diff <(ls claude/skills) <(ls .claude/skills)` and `diff <(ls claude/commands) <(ls .claude/commands)` print nothing
- [x] A9 `docs/PLATFORMS.md` counts and lists match disk — `ls claude/skills | wc -l` and `ls codex/skills | wc -l` both equal the number PLATFORMS.md states (11), `! grep -q 'ft-audit-context' docs/PLATFORMS.md`
- [x] A10 `git diff --check` → 0
- [x] A11 The ported pass bodies keep every measurement, threshold, and severity rule of the standalone skill (40k/30k char bands, >30 commands / >25 skills, three flowtron-modes with pass 2/3 downgrade, `ft-` prefix High / same-base-name Medium) — `judgment`: diff read of `passes/context.md` against the pre-deletion `SKILL.md`

## 🧩 Subtasks

- [x] Write `claude/skills/ft-audit/passes/context.md` in the `docs.md` shape: slug `audit-context`; fixed scope (`CLAUDE.md`, `AGENTS.md`, `.claude/{commands,skills}` one level deep) with the three flowtron-modes as rubric resolution (no placeholders); passes 1 Context bloat · 2 Paste-block redundancy · 3 `ft-*` namespace · 4 Lean-context drift · 5 Tooling & orphans; severity guide from the standalone bands; specialist additions (no-flowtron downgrade of passes 2/3, adherence-budget note, `docs/CONTEXT-BUDGET.md` governs flowtron's own files, archived tasknotes out of scope)
- [x] Register `context` on the domain-set surfaces: `ft-audit/SKILL.md` (description + "One dispatcher, seven domains" + §1 step 1 token list), `claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`, `ft-audit-repo/SKILL.md:58`, `templates/audit-overlay-template.md:30-33`, `docs/GLOSSARY.md:17` (seven-file → eight-file; drop the standalone sentence), `docs/MIGRATION.md` §1.2.1 (seven-file → eight-file, table row, "all seven" ×2 → eight)
- [x] Delete the three shipped paths + `rm` the two gitignored `.claude/` links
- [x] Roster sweep: `AGENTS.md:37-39` (Four → Three), `SPEC/layout.md:62`, `codex/` `cursor/` `grok/` AGENTS-snippet global-utility sentences, `claude/skills/ft-update/SKILL.md:90`, `docs/PLATFORMS.md` (`:35`, `:74`, `:264`, `:266`, `:291` — 12 → 11), `docs/MIGRATION.md` (`:30` global-install row, `:63` global list)
- [x] Release checks: `step-7.1-standing-checks.md` (`:33` roster line, `:47` regex alternative), `step-7.1-mirror-pairs.md:167` (drop the `/ft-audit-context` clause)
- [x] Repoint: `docs/MIGRATION.md` §1.7 (`:331`) + §3.8 (`:486`) recommendations, `ft-new-project/SKILL.md:156`, `SPEC/unattended-candidacy.md:176` row — at `/ft-audit context` (fork name; by-path fallback before a fork exists)
- [x] `docs/MIGRATION.md` retired-skills table: `ft-audit-context` row, v5.29.0, replacement `/ft-audit context`
- [x] Verify: A1–A11 commands, repo-wide residue grep

## 🔗 Related

- [[CORE-EPIC-603]] — parent epic (skill-roster-diet)
- [[CORE-603.1]] — Discovery; shared design surface + retire-and-record recipe live in its Discovery Notes
- [[CORE-603.2]] — `blocked-by:` predecessor (retire `ft-flowtron` + `ft-stats`); same roster sites, same MIGRATION row shape
- [[CORE-603.4]] — successor; trims `ft-audit`'s description after this task adds the `context` token

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Third child of CORE-EPIC-603; the `.1` fleet survey found `ft-audit-context` referenced by 5 tasknote files across 4 repos while costing ~600 B of always-on description per session, and resolved the fold shape (`passes/context.md` under `ft-audit`'s normal contract). `.2` (the `blocked-by:` predecessor) is closed and archived, so the shared roster sites are free to edit.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — markdown skill bodies + docs; boundary concerns logged in Discovery Notes (dispatcher owns procedure, pass file owns data; no dispatcher-procedure edit needed). Full text: for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — `archive/core/` per the README table; 61 hits on the slug, read the three load-bearing ones (Discovery Notes). Full text: skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — one imprecision logged (PLAN says §1.2/§3.8; the recommendation blocks are §1.7/§3.8, §1.2 is a roster site). Full text: file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Source read.** `claude/skills/ft-audit-context/SKILL.md` (11,438 B: §0 preflight with three flowtron-modes, passes a–d, §5 summary + opt-in filing with the `[unattended]` mirror paragraph, §6 hard rules) + its two wrappers; `claude/skills/ft-audit/SKILL.md` (dispatcher: §1 step 1 token list, "five passes in its exact order", §3 finding format, §5 required PLAN write with `AskUserQuestion` confirm + its own `[unattended]` mirror); `passes/docs.md` as the shape to extend (slug → Scope & rubric hints → The 5 passes → Severity guide → Specialist additions, with `(→ dispatcher §N)` back-references).

**Register change (resolved by `.1`).** The standalone skill was soft prose, no `Finding #N`, opt-in filing. As a domain it inherits the dispatcher's contract: `Finding #N` format with `Operator action:`, required §5 write on confirm, `Surfaced by audit-context YYYY-MM-DD (Finding #N, <severity>)` attribution. The pass file must **not** cite `SPEC/unattended-candidacy.md` itself — the dispatcher §5 owns that mirror, and Pair N would demand the `unattended-candidates:` literal of any skill file that names the module.

**Pass count (operator: split drift).** Dispatcher runs "the pass file's five passes"; the standalone had four. Pass (d) bundled two categories, so it splits: **4 Lean-context drift** (prose surfaces — SPEC-duplicating tutorials, stale WIP notes, personal scaffolding in shared files) and **5 Tooling & orphans** (`.claude/` entries with no purpose, project-side validators/converters fighting "markdown is the schema"). No dispatcher or MIGRATION-table edit needed.

**Invocation (operator: fork name + by-path fallback).** `ft-audit` stays forked/overlaid, never symlinked (PLATFORMS installed-surface policy unchanged; step-7.1 exclusion list loses only the `ft-audit-context` line). Docs repoint at `/ft-audit context` — "your fork's name, e.g. `/audit context`" — and, before a fork exists, "ask your agent to run `.flowtron/core/claude/skills/ft-audit/SKILL.md` with `context` as the domain". `context` carries no `<…>` slots or `_(forker: …)_` notes (its scope is fixed by definition), so the §1 step 3 bootstrap never fires on it — an unforked run is clean, not degraded.

**Scope & rubric slots for `context`.** Default scope is fixed: `CLAUDE.md`, `AGENTS.md`, `.claude/commands/`, `.claude/skills/` (one level). Rubric = the three flowtron-modes from the standalone §0 (adopter → `.flowtron/core/claude/AGENTS-snippet.md` + `.flowtron/core/claude/skills/`; flowtron-self → `claude/AGENTS-snippet.md` + `claude/skills/`; none → passes 2 and 3 downgrade, noted in the Summary). Gates: none (no tooling audits context files) — state it rather than leave a slot. Extra scope token: none.

**Fork reach.** Thin overlays resolve pass files from the scaffold at run time, so they get `context` on the next bump with no action; full-copy forks get it offered by `/ft-update` Step 4.5 (absent at their `flowtron-reconciled:` point → offered per-file). Both already documented in MIGRATION §1.2.1 — the retired row can cite them.

**Best-practices boundary.** Precedent [[CORE-463.2]] (seventh domain `structure`) landed as pure data — zero dispatcher-procedure edits — across 16 enumeration sites; the same sites apply here minus `ft-flowtron` (retired in `.2`). Retire-and-record shape from [[CORE-573]] / [[CORE-603.2]]: delete the three paths, sweep rosters, MIGRATION retired row, residue grep with a named exclusion list. Pair N ([[CORE-577.6]]) is derivation-based (any skill naming the module), so deleting a filer needs no edit there.

**Archive skim.** `archive/core/` (README table). 61 notes mention the slug; load-bearing: [[CORE-463.2]] (add-a-domain enumeration site list — reused above), [[CORE-577.6]] (the `[unattended]` mirror paragraph the standalone §5 carries is *not* ported — the dispatcher's §5 already has the identical mirror), [[CORE-386]] (Rationalizations/Red Flags live only in the dispatcher — pass files add none). [[CORE-603.2]] is the immediate recipe.

**Drift check.** All cited paths exist at HEAD; `git status` clean at start. PLAN line says "§1.2/§3.8 recommendations" — the two recommendation blocks are MIGRATION §1.7 (`:331`) and §3.8 (`:486`); §1.2 (`:63`) is the global-utilities roster sentence, swept as a roster site. Not a contradiction; recorded, PLAN line left as-is. `docs/CONTEXT-BUDGET.md:136` is a dated measurement — release re-measure, not edited here (per `.1`). No SPEC contract contradicted: `SPEC/layout.md` §"Skill namespace" is a roster, not a count.

**Clarifications.** Two asked via `AskUserQuestion`, both answered with the recommended option (pass-count split; fork-name + by-path invocation). Assumptions: the retired row's "Released in" is `v5.29.0` (matching `.2`'s rows — the epic ships in one release); `ft-audit`'s `description:` gains only the `context` token here and is trimmed by `.4`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `passes/docs.md`'s shape verbatim (slug → Scope & rubric → 5 passes → Severity → Specialist); the domain landed as pure data with zero dispatcher-procedure edits, as [[CORE-463.2]] did. Full text: extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — no refactor; every edit is an enumeration-site update, a retire deletion, or a repoint. Full text: refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown only; the CI `drift` job steps are the executable checks and were run locally)

**Implementation Notes:**

- `passes/context.md` (new, 8,031 B): slug `audit-context`; fixed default scope with the empty-surfaces bail; rubric slots resolved by the three flowtron-modes (no-flowtron skips passes 2/3 with zero findings and a Summary note); gates explicitly `none`. Passes: 1 Context bloat (standalone (a) verbatim, incl. the budget-not-cliff note and the `CONTEXT-BUDGET.md` separation) · 2 Paste-block redundancy ((b)) · 3 `ft-*` namespace ((c)) · 4 Lean-context drift ((d) prose look-fors) · 5 Tooling & orphans ((d) `.claude/` orphans + validators). Size bands reworded to `above` / `below` / `more than` after the A1 placeholder scan matched the `<30,000 … >25` span — the dispatcher's §1 step 3 scans only the Scope & rubric block, but a loose scan would have false-positived.
- Not ported, by design: the standalone §5 opt-in `AskUserQuestion` filing and its `[unattended]` mirror paragraph (dispatcher §5 owns both; naming the module in the pass file would bind it to Pair N), the no-`Finding #N` register, and the "earlier version claimed 40k silently drops" correction note (historical; the budget-not-cliff sentence carries the substance).
- Registration: `ft-audit/SKILL.md` (description clause, "eight domains", §1 token list), `commands/ft-audit.md` (×2), `codex/skills/ft-audit/SKILL.md`, `ft-audit-repo/SKILL.md`, `templates/audit-overlay-template.md` (×2), `docs/GLOSSARY.md` (eight-file + standalone sentence dropped), `docs/MIGRATION.md` §1.2.1 (eight-file, table row, "all eight", "eight domains").
- Retire: `git rm` of the three shipped paths; `rm` of the two gitignored `.claude/` links. Roster sweep: `AGENTS.md` (Four → Three), `SPEC/layout.md`, three non-Claude snippets, `ft-update`, `step-7.1-standing-checks.md` (roster line + regex alternative), `step-7.1-mirror-pairs.md:167`, `SPEC/unattended-candidacy.md` row (now `/ft-audit-repo` §6 only — `/ft-audit` §5 already had its own row), `docs/PLATFORMS.md` (12 → 11 ×3, two lists, "eight domains").
- Repoint: MIGRATION §1.0 row removed, §1.2 global list, §1.7 + §3.8 recommendations, retired-skills row (v5.29.0; names the overlay / full-copy / unforked reach and the register change); `ft-new-project` Step 4 follow-up. Invocation phrasing per the operator's answer: fork name first (`/audit context`), by-path fallback before a fork exists.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only); the CI `drift` job's nine steps run locally instead (Testing Notes)

- [x] Ran lint/type-check on changed code — `git diff --check` + `git diff --cached --check` → 0

- [x] **Verification receipt** — see Testing Notes. Full text: recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `test -f … && for h in …; do grep -q || echo MISSING; done; ! grep -q -e '<[^>]*>' -e '_(forker:' passes/context.md` → 0 (first run → 1 on the `<30,000 … >25` span; bands reworded, re-run → 0)
- A2 `test ! -e …` (three paths) → 0
- A3 seven-surface `grep -q 'context'` loop prints nothing; `git grep -i -e 'seven domain' -e 'seven-file' -e 'all seven'` (archive/history excluded) prints nothing → grep exit 1 (no match)
- A4 residue `git grep -e 'ft-audit-context' -e 'audit-context'` with the named exclusions (+ `passes/context.md`, whose attribution slug is the deliberate survivor) prints nothing → exit 1 (no match)
- A5 `grep -q '| \`ft-audit-context\` | v5' docs/MIGRATION.md` → 0
- A6 `grep -c 'ft-audit context' docs/MIGRATION.md` → 3; `grep -q 'ft-audit context' ft-new-project/SKILL.md` → 0; `! grep -q 'ft-audit-context' SPEC/unattended-candidacy.md` → 0
- A7 CI `drift` job run locally step by step: wrapper-name invariant OK · shipped-skill parity `diff -u` → 0 · context budget OK · Pair A/B/C/J/M/N/O all OK; §7.1 symlink-roster derivation: five `diff -u` blocks → 0; self-wiring diffs + dangling-link find print nothing
- A8 `diff <(ls claude/skills) <(ls .claude/skills)` and the commands twin → 0
- A9 `ls claude/skills | wc -l` → 11, `ls codex/skills | wc -l` → 11, `! grep -q 'ft-audit-context' docs/PLATFORMS.md` → 0
- A10 `git diff --check; git diff --cached --check` → 0
- A11 judgment — diff read of `passes/context.md` against the deleted `SKILL.md`: 40,000 / 30,000 bands, the 30-command / 25-skill counts, the three flowtron-modes with the pass 2/3 downgrade, the (b) High/Medium/Low ladder, the (c) `ft-` prefix High / same-base Medium / loose-echo Low, and all five (d) look-fors are present; only the register (dispatcher-owned) and the historical correction note are dropped, as recorded in Implementation Notes.
- Structural quality: no duplication (the dispatcher's §5 mirror is cited, not copied), no dead content, no public-surface growth beyond the one domain token, code-facing docs updated on every enumeration surface (A3).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 entries: `AGENTS.md` (utility-only bullet Four → Three), `docs/MIGRATION.md` (§1.0 row removed, §1.2 list, §1.2.1 eight-file + `context` row, §1.7 / §3.8 repoints, retired row), `codex/` `cursor/` `grok/` AGENTS-snippet global-utility sentences, `docs/PLATFORMS.md` (counts, lists, eight domains) — updated as deliverables; `README.md`, `SPEC.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (grepped for the slug, domain counts, and skill counts: 0 hits). Full text: for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Folded `ft-audit-context` into `ft-audit` as the eighth `context` domain and retired the standalone skill in the CORE-603.2 demote shape. `passes/context.md` (new, 8.0 KB) carries the four standalone concerns as five dispatcher-shaped passes — Context bloat · Paste-block redundancy · `ft-*` namespace · Lean-context drift · Tooling & orphans (the old drift pass split, per the operator) — with the three flowtron-modes as rubric resolution and no forker placeholders, so it runs unforked without tripping the bootstrap. The `context` token is registered on the seven enumeration surfaces CORE-463.2 established; the three shipped paths are deleted; 15 roster / release-check / policy sites swept (`PLATFORMS.md` 12 → 11); `docs/MIGRATION.md` §1.7 + §3.8, `ft-new-project` Step 4, and the `SPEC/unattended-candidacy.md` surfaces table repoint at `/ft-audit context` — fork name first, by-path fallback before a fork exists (operator's choice). Net: +1 file / −3 files; 26 paths touched.

- **Verification:** A1–A11 all pass (A11 by diff read); the CI `drift` job's nine steps and the §7.1 symlink-roster derivation were run locally and print nothing.
- **Refactors:** none; one wording adjustment inside the new file (size bands → `above` / `below` / `more than`) so no angle-bracket scan can mistake a threshold for a placeholder. Deferred: `docs/CONTEXT-BUDGET.md:136` measurement line (release re-measure, per `.1`); `ft-audit`'s `description:` trim (`.4`).
- **Documentation verdict:** 6 of 18 AI-referenced docs updated, 12 no change.
- **`touches:` reconciliation:** `git diff --cached --name-only` = the 22 declared paths (3 of them deletions) + `.flowtron/PLAN.md` stub flip + this tasknote's archive move. No undeclared paths.
- **Maintainability effect:** one fewer always-loaded `description:` (~600 B of the 9.6 KB the epic targets — 0.6 KB here on top of `.2`'s 1.1 KB), one fewer global-install row for operators to wire by hand, and the context audit now inherits every dispatcher improvement (Operator action filter, `[unattended]` candidacy, filing commits, Rationalizations) instead of carrying its own copy; thin overlays get the domain on their next bump with no action, full-copy forks via `/ft-update` Step 4.5.
- **Operator follow-up (outside the repo):** the global `~/.claude/skills/ft-audit-context` + `~/.claude/commands/ft-audit-context.md` symlinks, if installed, now dangle — `rm` them by hand; not touched here per the path-access rule.

**Archived:** 2026-09-18
