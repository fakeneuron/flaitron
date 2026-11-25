---
title: headroom-runner-bodies
status: completed
tags: [context-budget, procedure, snippet]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-920, CORE-920.2, CORE-869.5, CORE-891, CORE-929, CORE-920.N]
touches:
  - SPEC/procedures/ft-task.md
  - claude/AGENTS-snippet.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-920.3 | headroom-runner-bodies

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-920]] [[CORE-920.2]] [[CORE-869.5]] [[CORE-891]] [[CORE-929]] [[CORE-920.N]]

## 🎯 Goal

Bring `SPEC/procedures/ft-task.md` and `claude/AGENTS-snippet.md` below their NEAR CAP lines (95% and 97%) with pointer-not-narrate cuts, taking every genuine restatement, rationale or archaeology cut found (paste-block included) so the headroom lasts, and record both in `docs/CONTEXT-BUDGET.md` §"Cap history".

## ✅ Acceptance

- [x] `context_budget` prints no `NEAR CAP` line for either file (procedure < 24,700; snippet < 13,386), caps unchanged — `bash tools/drift-checks.sh context_budget`
- [x] Both Cap-history rows carry a `held <cap> [[CORE-920.3]] (<before> → <after>)` entry — `grep -c 'CORE-920.3' docs/CONTEXT-BUDGET.md` = 2
- [x] The pair_s-guarded paste-block lines (flags line, "Do not skip phases" sentence, peer slugs) still match `AGENTS.md`, and the four snippet wiring blocks stay at parity — `bash tools/drift-checks.sh pair_s snippet_roster_parity`
- [x] Every inbound citation still resolves (`§"Agent-neutral primitives"`, `§"One-time symlink wiring"`, every heading kept) and the full drift scan passes — `bash tools/drift-checks.sh`
- [x] The updater's paste-block parse still finds the `## Workflow` block — `node --test tools/update-adopters.test.mjs`
- [x] No unique rule lost — every cut is a restatement (pointer kept), rationale tail, or archaeology — `judgment`: meaning-preservation is a reading, graded by the External review

## 🧩 Subtasks

- [x] Trim `SPEC/procedures/ft-task.md`: tier-advisory preface restating Step 1; debug / loop / unattended primitive-row restatements of their fragments; composition paragraph → `step-0-flags.md` pointer; Parking list restatement; Step 2 ordering rationale tail; Phase 3 unattended full-validation narration → `gate-postures.md` pointer
- [x] Trim `claude/AGENTS-snippet.md` outside the fence: KEEP IN SYNC comment → pointer at `AGENTS.md`'s mirror comment + `pair_s`; §"Check that Claude Code loads it" → MIGRATION §1.3 pointer; `.claude/rules/` verification archaeology; Cursor/Grok verify sentences → MIGRATION §1.2; bump paragraph → `/ft-update` + MIGRATION pointers
- [x] Trim inside the fence: the `Utilities:` bullet's `/ft-seed-unattended` decline-path list (lives in `SPEC/unattended-candidacy.md` §"Seeding an existing plan")
- [x] Add two `held` Cap-history entries in `docs/CONTEXT-BUDGET.md`
- [x] Run `context_budget`, `pair_s`, `snippet_roster_parity`, the updater suite and the full drift scan

## 🔗 Related

- [[CORE-EPIC-920]] — parent epic (near-cap-trims-2; Theme: Budget trims don't hold).
- [[CORE-920.2]] — sibling trim of two SPEC modules; the shape this follows.
- [[CORE-869.5]] — prior near-cap trim of the procedure (25,797 → 24,673).
- [[CORE-891]] — set the snippet's `NEAR CAP at 97%` override.
- [[CORE-929]] — last snippet growth (13,489 → 13,544, crossing 97%).
- [[CORE-920.N]] — the epic audit.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `context_budget` at HEAD `493fee98` prints `NEAR CAP` for both: procedure 24,763 of 26,000 (95%), snippet 13,544 of 13,800 (98%, past its 97% line). The row said 97% for the snippet; CORE-929 added 55 bytes after filing.

- [x] Read relevant source files — both targets in full; `SPEC/epic.md`; `docs/CONTEXT-BUDGET.md` rows + Cap history; `tools/drift-checks.sh` `pair_s`; `docs/MIGRATION.md` §1.1–§1.3; restatement homes in `step-0-flags.md`, `step-4-debug-mode.md`, `SPEC/loop.md`, `unattended-mode.md`, `SPEC/gate-postures.md`, `claude/skills/ft-update/SKILL.md`.

- [x] **Best Practices Review** — `N/A`: markdown contract trims; no code or module boundary moves.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Path greps hit 212 (procedure) and 572 (snippet) notes, too broad to read, so I read the trim and sizing precedents directly: [[CORE-920.2]] / [[CORE-869.5]] (hold the cap, `held` entry, cited headings untouched; procedure keeps its Phase 4 deltas and §"Agent-neutral primitives", `last-verified:` unbumped), [[CORE-891]] (snippet's 97% override is sized to one upper-bound unit), [[CORE-929]] (the wiring section's closing sentence naming `snippet_roster_parity` is new and load-bearing).

- [x] **Drift check** — sizes match; the row's 97% for the snippet is stale (98% now), not a scope change. Guards: `pair_s` reads the paste-block's flags line, "Do not skip phases" sentence and peer slugs (`Start a task with` + `Peer skills:` bullets) byte-wise against `AGENTS.md`; `snippet_roster_parity` reads the `ln -s` block; `tools/update-adopters/text.mjs` parses the fenced `## Workflow` block. Inbound section citations: snippet §"One-time symlink wiring" (3); procedure §"Agent-neutral primitives" (3, `claude/CAPABILITIES.md` — its rows name the debug / micro / loop primitives, which stay).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  AskUserQuestion on fence scope: operator chose to tighten the paste-block too. Assumptions carried from [[CORE-920.2]] (same epic, same operator choice): every genuine cut, caps held with `held` entries, §"Ledger" stays `/ft-release`'s job, `last-verified:` unbumped, no heading renamed.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** each planned cut has a verified home —
- Composition rules: `step-0-flags.md` line 36 (orthogonal; micro refuses loop/debug; debug re-verify not suppressible) and line 5 (any combination).
- Debug "content, never mechanics": `step-4-debug-mode.md` intro. Loop drive: `SPEC/loop.md` intro. Unattended delegations: `unattended-mode.md` §"What the posture adds" / gate-postures §"What is inherited, and what is not".
- Unattended full-validation set: `SPEC/gate-postures.md` §"What `--unattended` never relaxes" (lines 290–297).
- Load check, symlink route, `@AGENTS.md` import: MIGRATION §1.3. Cursor/Grok compatibility wiring: MIGRATION §1.2. Bump mechanics (Pinned-to rewrite, Workflow block, dangling links, smoke, reconcile-skills): `/ft-update` SKILL.md Steps 3.5–5.
- The `.claude/rules/` guidance exists only in the snippet, so only its dated verification parenthetical goes.

Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-920.2]] / [[CORE-869.5]]'s hold-the-cap trim: restatement → pointer, a `held` Cap-history entry per row, every heading and guarded literal untouched

- [x] **Minimal refactor gate** — no restructuring; sentence-level cuts only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose contract trims; the drift checks and updater suite are the guard

**Implementation Notes:**

- `SPEC/procedures/ft-task.md` 24,763 → 23,609 (−1,154, 90.8%). Cuts:
  - the tier-advisory preface (Step 1 states it);
  - the debug row's "content, no new phase…" (`step-4-debug-mode.md` intro), the loop row's drive summary (`SPEC/loop.md`, `step-5-loop-mode.md` line 7), the unattended row's delegation clause (`unattended-mode.md`, gate-postures §"What is inherited, and what is not");
  - the five-line composition paragraph → one sentence pointing at `step-0-flags.md` (micro's refusal kept inline; debug's unsuppressible re-verify stays in the Phase 3 bullet);
  - the Parking paragraph's never-relaxes list (its cited section holds it);
  - Step 2's second rationale clause (the preamble states it);
  - the Phase 3 full-validation-set narration → the gate-postures pointer already there, now saying it names the set.
- `claude/AGENTS-snippet.md` 13,544 → 11,178 (−2,366, 81.0%). Cuts:
  - the KEEP IN SYNC comment, 5 lines → 1: guard 1's rules point at `AGENTS.md`'s mirror comment; guards 2 (CORE-519) and 3 (CORE-516) stay named, since `AGENTS.md`'s own guards cite this comment;
  - **inside the fence**, the `Utilities:` bullet's four-way decline list → "preparing the rows its predicate declines" + the existing unattended-candidacy pointer;
  - §"Check that Claude Code loads it" two paragraphs → one (MIGRATION §1.3 holds the steps);
  - the Cursor/Grok/Codex verify sentences → MIGRATION §1.2 + sibling snippets;
  - the sparse paragraph's re-apply and rule-cost clauses (MIGRATION §1.1), now the siblings' shape;
  - the bump paragraph's per-step mechanics and v7.x archaeology → `/ft-update` SKILL.md pointer.
- Kept: the `.claude/rules/` section (unique to this file), the wiring SSOT prose ([[CORE-929]]'s closing sentence), every heading, the pair_s-read lines.
- `docs/CONTEXT-BUDGET.md`: two `held` entries; caps and "Why" cells unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `context_budget`, `pair_s`, `snippet_roster_parity`, `pair_q`, updater suite

- [x] Ran lint/type-check on changed code — `git diff --check` clean; no code changed

- [x] **Verification receipt** — receipt below; no code changed, so the structural assertions are `N/A`

- [x] **External review** — `/code-review medium` over this task's three files; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Final tree (after the review fixes):

```text
bash tools/drift-checks.sh context_budget                    → 0   (no NEAR CAP for either file; procedure 23,667 = 91.0%, snippet 11,574 = 83.9%)
grep -c 'CORE-920.3' docs/CONTEXT-BUDGET.md                  → 2
bash tools/drift-checks.sh pair_s snippet_roster_parity      → 0
bash tools/drift-checks.sh pair_q                            → 0   (run before the review fixes, which touched no heading or § citation; the full scan below re-covers it)
bash tools/drift-checks.sh                                   → 0   (full scan)
node --test tools/update-adopters.test.mjs                   → 0   (125 pass, 0 fail)
git diff --check                                             → 0
```

External review (`/code-review medium`, scoped to the three changed files): no blocker, seven notes.
- **Fixed**, procedure: "compose in any combination" contradicted the flags line's "`--unattended` never together with `--fast`". The line now says unattended mode already includes autonomous mode, so never request both (+58).
- **Fixed**, snippet bump paragraph: restored the `Pinned to:` write and "stages only the paths it changed, preserving custom skills", so the "same writes the fleet updater makes" claim lists them again.
- **Fixed**, snippet sparse paragraph: restored the re-clone caveat as "(a re-clone restores it until the next `/ft-update`)".
- **Fixed**, snippet verify paragraph: linked the three sibling snippets and restored "Cursor and Grok load `.claude/skills/`… already serves them". The three fixes add +396 together.
- **Fixed**, ledger: the procedure entry now reads "re-measured 24,763" because CORE-915 and CORE-918.4 moved it unrecorded.
- **No change**, loop row: it still says to read `step-5-loop-mode.md` now. That fragment's line 7 owns the autonomous drive and the pre-loop `--fast` reach, and the SOP's Phase 2 bullet still names the destructive park.
- **No change**, CONTEXT-BUDGET §"Ledger" snapshots (lines 298, 490) and the procedure row's "1,104 left": the snapshots are `/ft-release`'s to refresh ([[CORE-920.2]] left them the same way), and the "Why" cell's figure is a dated narrative step.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry: no change (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `codex/` / `cursor/` / `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). `claude/AGENTS-snippet.md` is this task's own deliverable. `AGENTS.md`'s CORE-516 / CORE-519 / mirror comments still point at the snippet's comment, which still names all three guards. `CAPABILITIES.md`'s §"Agent-neutral primitives" rows still match: the debug, micro and loop rows stay.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the same hold-the-cap trim [[CORE-920.2]] ran; nothing new for the always-loaded layer

**Final Summary:**

Both runner bodies are back under their NEAR CAP lines, with headroom to spare:
- `SPEC/procedures/ft-task.md` 24,763 → 23,667 (91%), 2,333 left.
- `claude/AGENTS-snippet.md` 13,544 → 11,574 (84%), 2,226 left. The paste-block that every adopter's `AGENTS.md` carries is 180 bytes shorter, from the `Utilities:` bullet (596 → 416).

Every cut was a restatement with its pointer kept, a rationale tail, or archaeology. Every heading and every pair-guarded literal was kept.

Recap:
- **Changed:** `SPEC/procedures/ft-task.md` (−1,096), `claude/AGENTS-snippet.md` (−1,970, of which −180 inside the fence), and two `held` entries in `docs/CONTEXT-BUDGET.md` §"Cap history".
- **Verification:** see Testing Notes; every command exits 0.
- **Refactors:** none.
- **Docs:** no drift.
- **Scope:** declared 3 files, changed 3. Nothing undeclared.
- **Maintainability:** before NEAR CAP fires, the procedure now absorbs 1,033 chars, about 1.2 upper-bound substantial units (892), and the snippet absorbs 1,812, about 5 units (363) before its 97% line. Before this task neither had any.

**Archived:** 2026-11-24
