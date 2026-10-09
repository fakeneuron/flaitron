---
title: codex-audit-overlay-path
status: completed
tags: [audit, codex, ft-update, docs]
created: 2026-10-08
due:
related-tasks: [CORE-603.3, CORE-748, CORE-744]
touches:
  - codex/skills/ft-audit/SKILL.md
  - claude/commands/ft-audit.md
  - claude/skills/ft-update/SKILL.md
  - docs/MIGRATION.md
---

# CORE-747 | codex-audit-overlay-path

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-603.3]] · [[CORE-748]]

## 🎯 Goal

Make both `ft-audit` install pointers (Codex wrapper, Claude command stub) lead with the recommended thin overlay, fix the stub's misquoted §1.2.1 heading, and extend `/ft-update` Step 4.5 so Codex forks under `.agents/skills/` get the same drift warning and pass-file refresh as Claude forks.

## ✅ Acceptance

- [x] A1 The Codex wrapper names the overlay template and puts the overlay ahead of the full copy — `grep -q 'audit-overlay-template.md' codex/skills/ft-audit/SKILL.md && [ "$(grep -n -m1 -i 'overlay' codex/skills/ft-audit/SKILL.md | cut -d: -f1)" -lt "$(grep -n -i -m1 'cp -R\|full-copy\|full copy' codex/skills/ft-audit/SKILL.md | cut -d: -f1)" ]`
- [x] A2 The Claude command stub names the overlay and leads with it — `grep -q 'audit-overlay-template.md' claude/commands/ft-audit.md`
- [x] A3 The stub quotes the real §1.2.1 heading — `grep -qF 'Optional: fork the `/ft-audit` scaffold per stack' claude/commands/ft-audit.md && ! grep -qF '"Optional: fork `/ft-audit` per stack"' claude/commands/ft-audit.md`
- [x] A4 Step 4.5 scans the Codex root too — `grep -qF '.agents/skills/*/SKILL.md' claude/skills/ft-update/SKILL.md`
- [x] A5 MIGRATION §1.2.1's marker paragraph names both scanned roots — `grep -n 'the bump step scans' docs/MIGRATION.md | grep -qF '.agents/skills/'`
- [x] A6 Drift checks (Pair Q citations, frontmatter YAML, final newlines, context budgets) pass — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Rewrite `codex/skills/ft-audit/SKILL.md` callout: overlay first (`templates/audit-overlay-template.md` → `.agents/skills/audit/SKILL.md`), full copy as the alternative, keep "not symlinked" rationale
- [x] Rewrite `claude/commands/ft-audit.md` closing paragraph: overlay first, full copy second; correct the §1.2.1 heading quote
- [x] Extend `claude/skills/ft-update/SKILL.md` Step 4.5: scan `.agents/skills/*/SKILL.md` when present; generalize `.claude/skills/<dir>` paths in items 4–5 to `<skills-root>/<dir>`
- [x] Update `docs/MIGRATION.md` §1.2.1 marker paragraph to name both roots
- [x] Run drift checks

## 🔗 Related

- [[CORE-603.3]] — folded `ft-audit-context` into `ft-audit`; last pass across both wrappers
- [[CORE-748]] — sibling audit-docs finding (scaffold self-refs, overlay fill step)
- [[CORE-744]] — frontmatter YAML guard covering both wrapper files

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three defects reproduce at HEAD. `codex/skills/ft-audit/SKILL.md` says "Fork the whole `claude/skills/ft-audit/` directory" and never mentions the overlay. `claude/commands/ft-audit.md` says "Fork the whole directory" and quotes §1.2.1 as `"Optional: fork `/ft-audit` per stack"`, but the real heading is "Optional: fork the `/ft-audit` scaffold per stack". `ft-update` Step 4.5 globs only `.claude/skills/*/SKILL.md`, while the Codex wrapper tells forkers to install at `.agents/skills/audit/`.

- [x] Read relevant source files — the two wrappers, `docs/MIGRATION.md` §1.2.1 (lines 92–196), `claude/skills/ft-update/SKILL.md` Step 4 (Codex re-wire) + Step 4.5, `codex/AGENTS-snippet.md` §"Translation rules", `templates/audit-overlay-template.md` path lines, `docs/CONTEXT-BUDGET.md` §"Budgets"

- [x] **Best Practices Review** — N/A: doc/skill-prose edit, no code or module boundary

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Many hits (CORE-463.2, 465, 468, 535.N, 561, 577.5, 595, 603.3, 604.N, 613, 644, 654, 661, 720, 722, 723, 744, 748). Read greps of the load-bearing ones: CORE-603.3 (registered `context` on both wrappers; "overlays inherit, full-copy forks get Step 4.5 offer" already documented), CORE-744 (both wrapper frontmatters are under the `skill_frontmatter_yaml` guard; `domain''s` single-quote escaping in the stub's description must survive), CORE-748 (overlay installs as `audit`), CORE-561 (wrappers name the forker divergence trigger full-copy vs overlay). Nothing contradicts the plan.

- [x] **Drift check** — cited paths exist; PLAN line matches the code. MIGRATION §1.2.1 already says "prefer the lighter thin overlay … (most stacks)", so the wrappers are the outliers, not the doc. Step 4's Codex re-wire uses an "if `.agents/skills/` exists" guard — the precedent Step 4.5 follows.

- [x] Asked clarifying questions — Step 4.5 coverage: operator chose **scan both roots** (`.claude/skills/*` and, when present, `.agents/skills/*`, same dir-not-symlink test). Assumptions: Cursor/Grok roots stay out of scope (they reuse `.claude/` or symlink canonical bodies; the finding names Codex only); Codex has no command-stub surface, so the Codex overlay install is one `cp` of the template.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Codex ft-* wiring is per-skill dir symlinks (`ln -s ../../<FT>/codex/skills/<name> .agents/skills/<name>`), so Step 4.5's `test ! -L "$(dirname <path>)"` excludes them exactly as it does `.claude/skills/ft-*`. No new test needed.
- `ft-update/SKILL.md` is 19,577 chars against the 33,000 `claude/skills/*/SKILL.md` cap — ample.
- No drift-check pair binds Step 4.5 prose or the §1.2.1 heading text; Pair Q validates `§"…"` citations, so the corrected quote must match the heading verbatim.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: Step 4 already conditions Codex work on "if `.agents/skills/` exists"; Step 4.5 adopts the same guard and names the fork's root `<root>` (used in the drift warning, the `ls`, and the per-file `cp`). The commit-staging block already stages `.agents/skills/`, so a copied pass file is picked up with no change there.
- Both wrappers now lead with the overlay (`.flaitron/core/templates/audit-overlay-template.md` → `<skills root>/audit/SKILL.md`), full copy as the pass-body-editing alternative — matching MIGRATION §1.2.1's existing "overlay for most stacks" verdict.
- Stub's heading quote corrected to "Optional: fork the `/ft-audit` scaffold per stack".
- No refactor; no tests (prose-only skill/doc edit — the drift-check suite is the test surface).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted suite / lint: `bash tools/drift-checks.sh` (Pair Q citations, `skill_frontmatter_yaml`, final newlines, context budgets) — the narrowest check covering markdown/skill edits; no viz or tools code changed.

Verification receipt (post-fix re-run):
- A1 overlay-first check (with `-i`) → 0
- A2 `grep -q 'audit-overlay-template.md' claude/commands/ft-audit.md` → 0
- A3 heading-quote grep pair → 0
- A4 `grep -qF '.agents/skills/*/SKILL.md' claude/skills/ft-update/SKILL.md` → 0
- A5 MIGRATION marker grep → 0
- A6 `bash tools/drift-checks.sh` → 0
- Structural: no duplication introduced; no dead text; stale Claude-only claims swept (item 6 caught by review).

External review — `/code-review medium` on the working-tree diff, 5 findings:
1. **blocker** — Step 4.5 item 6's empty-scan condition still named only `.claude/skills/*/SKILL.md` (contradicts A4's widened scan). Fixed → back to Phase 2, Phase 3 re-run from the top.
2. note — A1's verify command was case-sensitive and failed against "Full-copy". Fixed: tasknote command now carries `-i` (the form actually run).
3. note — Codex wrapper gave the overlay source as bare `templates/…`, which doesn't resolve in an adopter. Fixed → `.flaitron/core/templates/…`.
4. note — same bare path in the Claude command stub. Fixed.
5. note — the wrapper's "translate the way §Translation rules translates `.claude/`" pointed at a section with no mapping. Fixed: states the substitution inline (`.agents/skills/` for `.claude/skills/`, skip the `.claude/commands/` copy).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Doc-drift sweep: `docs/MIGRATION.md` updated (§1.2.1 marker paragraph names both roots); every other AI-referenced doc — no change (only AGENTS.md mentions an overlay, flaitron-self's own).

Recap — changed files: `codex/skills/ft-audit/SKILL.md`, `claude/commands/ft-audit.md`, `claude/skills/ft-update/SKILL.md`, `docs/MIGRATION.md`. Verification: A1–A6 → 0 after one review round (1 blocker, 4 notes, all fixed). Refactors: none. `touches:` reconciliation: `git diff --name-only` = the four declared paths, exact match. Maintainability: both install pointers now agree with MIGRATION's overlay-first verdict, and Codex forks get drift warnings + pass-file refresh from `/ft-update`.

Learnings: N/A.

**Archived:** 2026-10-08
