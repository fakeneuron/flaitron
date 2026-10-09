---
title: skill-surface audit
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.2, CORE-769.3, CORE-769.4, CORE-769.5, CORE-769.6, CORE-769.7]
---

# CORE-769.N | skill-surface audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-769]]

## 🎯 Goal

Verify the completed `CORE-EPIC-769` (`skill-surface`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-769` (Step 5), landing in the audit's closure commit — no misses, so no rows filed
- [x] Single `feat: CORE-769.N — audit CORE-EPIC-769` (or `chore: ...` if no code edits land) commit lands — `chore:`, since no code edits landed
- [x] PLAN.md line for `CORE-769.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-769.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-769.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]]–[[CORE-769.7]] — audited cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — the parent and the `.1`–`.7` walk were done at pre-flight

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All seven children closed on 2026-10-09, with `.7` (`da2f9cb5`) last, so this is not an early audit. The operator invoked `/ft-close-epic`, and the pre-flight checks passed: the tree was clean, `.N` is the reserved terminal child, and no siblings were open.

- [x] Read relevant source files — the seven archived cohort notes (Goal, Discovery/Implementation Notes, Phase 4, Final Summary), plus the live surfaces the coherence pass checks (below)

- [x] **Best Practices Review** — `N/A`: a verification pass with no code or module-boundary change

- [x] **Archive skim** — `archive/core/` checked against the README table (`CORE-*`). The archive here is the cohort itself; CORE-769.1's Probe D already covered the non-cohort precedents (CORE-465/572/711/712).

- [x] **Drift check** — the paths the cohort cites still resolve at HEAD: the 12 skill dirs in each of `claude/skills/` and `codex/skills/`, `SKILL_RENAME` in `tools/update-adopters.mjs`, and the five MIGRATION v7.0.0 rows. The PLAN `.N` line matches SPEC/epic.md.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed: the full cohort is closed and the scope is the canonical audit

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — `touches:` omitted: the only file changes are PLAN.md and this note

**Discovery Notes:**

Cohort inventory (all closed 2026-10-09):

- **`.1` skill-surface discovery** — kept the submodule as the packaging channel and kept the `ft-` prefix (CORE-384 decline, reconfirmed). Filed `.2`–`.7` with a Sequential fan-out. Decisions: hard cut, major release v7.0.0, `feat!:` children.
- **`.2` retire-command-wrappers** — removed all 12 `claude/commands/` stubs, moving 6 `argument-hint:` lines into SKILL.md. `wrapper_name_invariant` became `skill_name_invariant`, Pair J/M were re-pointed at SKILL.md, the §7.1 command half and the `/ft-update` Step 5 smoke check were re-pointed, and the updater's Claude surface became `claudeSkillsSurface`. Added a MIGRATION retired row.
- **`.3` rename-file-task** — `ft-file-followup` → `ft-file-task` across 44 files. Added a MIGRATION row, and the two older replacement rows gained interim-name notes.
- **`.4` rename-open-epic** — `ft-epic-discovery` → `ft-open-epic` across 37 files. The `ln -s` blocks were re-sorted.
- **`.5` rename-adopt** — `ft-new-project` → `ft-adopt` (still global-only) across 23 files. Covered the §7.1 exclusion list and regex, the PLATFORMS global column, and the MIGRATION §1.0 recipe.
- **`.6` rename-seed-unattended** — `ft-seed` → `ft-seed-unattended` across 21 files.
- **`.7` rename-migrate-mode** — the updater's `SKILL_RENAME` (v7.0.0 map) adds a link swap and command-link prune inside the bump's rollback window, and fixes the `--no-renames` blind spot in the new-skills note. `/ft-update` Step 4.6 now names replacements, MIGRATION gains a §"Upgrading to v7.0.0 (skill renames)" recipe, and natabula NAT-391 was filed (local commit `e6f66a6`, unpushed).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`: a verification pass over cohort deliverables, following the CORE-768.N audit shape

- [x] **Minimal refactor gate** — no refactor; no inline fix was warranted (see the heading observation below)

- [x] Implemented the minimal solution — the audit findings below

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code changed

**Implementation Notes:**

**Coherence findings: no inconsistencies that need a child row.**

- **Old-slug residue (cumulative).** `git grep -P 'ft-file-followup|ft-epic-discovery|ft-new-project|\bft-seed\b(?!-)'` over non-archive files, excluding the dated records (VERSION-HISTORY, CODEX-VERIFICATION, HARNESS-SURVEY, PLAN-ARCHIVE). Every hit is deliberate:
  - The MIGRATION retired rows, the interim-name notes, and the v7 recipe.
  - `SKILL_RENAME` and its comments and tests.
  - The pre-v7 probe note in `docs/EXTERNAL-AGENTS.md`.
  - Historical sentences restored by `.3`/`.4`/`.6`: CONTEXT-BUDGET L98/147/289, the §7.1 v5.15.0 stranded-links line, the Pair J "then `/ft-epic-discovery`" history, and the CORE-744 comment in `drift-checks.sh`.
  - The completed CORE-758 PLAN row.
  - `.flaitron/specs/spec-to-work-handoff.md`, which is `status: superseded` and kept as a historical record.

  The bare-stem grep (`file-followup` / `epic-discovery` / `new-project`, per `.5`'s learning) returns nothing.
- **Naming parity.** All 24 SKILL.md `name:` fields equal their dir slug, and the claude and codex dir sets are identical (12 each). The six `argument-hint:` lines survived the renames (`ft-file-task`, `ft-open-epic` included). The rosters in AGENTS.md, SPEC/layout.md §"Skill namespace", README, and GLOSSARY all name the new slugs.
- **Cross-refs.** MIGRATION §"Skills retired so far" has one v7.0.0 row per retirement: the command stubs plus the four renames. The test-bound parity holds between `SKILL_RENAME.map` and the table. AGENT-NEUTRALITY's `skill_name_invariant` row agrees with SPEC/layout.md. A cumulative grep of the sweep set and `claude/skills/` for "skills and commands"-style wording finds nothing stale.
- **No regressions.** The gates are green at HEAD: drift checks pass, the drift-check self-test passes 19/19, and the updater suite passes 74/74 (`.2` shipped 65, `.7` added 9).
- **Observation, not filed.** `ft-open-epic`'s H1 reads `# ft-open-epic —`, while its partner reads `# close-epic —`. The prefixed form came over from `# ft-epic-discovery —` and is shared by `ft-refactor`, so the cohort did not introduce it, and the house has no settled heading convention (10 unprefixed, 2 prefixed). Below the filing threshold.
- **Inline fixes:** none.
- **Misses filed:** none, so the parent flips at this closure.
- **Operator hand-offs (not PLAN rows: local or release-owned).**
  1. flaitron-self's gitignored wiring still holds dangling `.claude/skills/{ft-file-followup,ft-epic-discovery,ft-new-project,ft-seed}` and the four matching `.agents/skills/` links. The relink was blocked by the Path Access hook, as it was for `.3`–`.6`. `/ft-release` §7.1's local self-wiring check will flag them until they are re-pointed.
  2. The global `~/.claude/skills/ft-new-project` → `ft-adopt` link (from `.5`). It is outside the repo and was not inspected.
  3. Push natabula `e6f66a6` (NAT-391), which was left local and unpushed.
  4. At `/ft-release` v7.0.0, the tag's `Migration (BREAKING)` block should point at MIGRATION §"Upgrading to v7.0.0 (skill renames)" (from `.7`). `claude/CAPABILITIES.md`'s `v6.1.0` last-verified stamp is re-verified at the same cut.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` for this diff. The regression check ran the cohort's suites (receipt below).

- [x] Ran lint/type-check on changed code — `N/A`: markdown only

- [x] **Verification receipt** — see Testing Notes

- [x] **External review** — `N/A`: no code fix landed, and the diff is PLAN stub flips plus this note

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh                    → 0
node --test tools/drift-checks.test.mjs       → 0 (19 pass)
node --test tools/update-adopters.test.mjs    → 0 (74 pass)
node --check tools/update-adopters{,.test}.mjs → 0
old-slug residue grep (non-archive, dated records excluded) → deliberate hits only (classified above)
bare-stem grep                                → no output
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update. These are cumulative verdicts against HEAD after `.1`–`.7`; this audit edits none of them.
  - README.md — no change: the quickstart uses `ft-adopt`, and the subset roster names `ft-seed-unattended`
  - AGENTS.md — no change: the peer and utility rosters carry the new slugs
  - SPEC.md — no change: the §"Deferred hand-off filing" path names `/ft-file-task`
  - docs/MIGRATION.md — no change: five v7.0.0 retired rows and the §"Upgrading to v7.0.0" recipe are present
  - claude/AGENTS-snippet.md — no change: no command half, and the new `ln -s` lines are in place
  - codex/, cursor/, grok/ AGENTS-snippet.md — no change: the `ln -s` lines use the new slugs and are sorted
  - docs/CONVENTIONS.md — no change: `skill_name_invariant` is named in the CI paragraph
  - CONTRIBUTING.md — no change: §"Developing flaitron skills" is consistent
  - SECURITY.md — no change
  - docs/AGENT-NEUTRALITY.md — no change: rows agree with SPEC/layout.md
  - docs/PLATFORMS.md — no change: the global-only column shows `ft-adopt`, and the non-goals mention the v7.0.0 link swap
  - claude/CAPABILITIES.md — no change now; the `v6.1.0` stamp is re-verified at the v7.0.0 release (hand-off 4)
  - docs/AGENT-COMPAT.md — no change
  - docs/EXTERNAL-AGENTS.md — no change: invocations use the new slugs, plus the pre-v7 probe note
  - docs/WORKTREES.md — no change
  - docs/VISION.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. The repeated local-relink hand-off is a Path Access hook artifact (a relative `ln -s` target reads as an outside path), not a workflow rule.

**Final Summary:**

The CORE-EPIC-769 audit found the skill-surface cohort coherent. The command wrappers are gone, and the four renames (`ft-file-task`, `ft-open-epic`, `ft-adopt`, `ft-seed-unattended`) read consistently across every live surface. The fleet updater carries adopters across v7.0.0. No misses needed a child row, so this closure flips the epic.

- **Cohort inventoried:** `.1`–`.7`; see Discovery Notes.
- **Verification:** drift checks 0, self-test 19/19, updater 74/74. The residue greps are clean apart from the deliberate hits classified above.
- **Inline fixes:** none. **Follow-ups filed:** none.
- **Changed files:** `.flaitron/PLAN.md` (`.N` stub, parent flip, cohort move) and this note.
- **Operator hand-offs:**
  - Re-point flaitron-self's local `.claude/skills` and `.agents/skills` links, which `/ft-release` §7.1 will flag.
  - Re-point the global `~/.claude/skills/ft-new-project` link.
  - Push natabula NAT-391.
  - Write the v7.0.0 tag's BREAKING Migration block.

**Archived:** 2026-10-09
