---
title: global-layer-alignment audit
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-770, CORE-770.1, CORE-770.2, CORE-770.3, CORE-770.4]
---

# CORE-770.N | global-layer-alignment audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-770]]

## 🎯 Goal

Verify the completed `CORE-EPIC-770` (`global-layer-alignment`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-770` (Step 5), landing in the audit's closure commit — no misses, so no rows
- [x] Single `feat: CORE-770.N — audit CORE-EPIC-770` (or `chore: ...` if no code edits land) commit lands — `chore:` (no code edits)
- [x] PLAN.md line for `CORE-770.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-770.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-770.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-770]] — parent epic
- [[CORE-770.1]] — Discovery; filed `.2`–`.4`
- [[CORE-770.2]] — memory-refresh
- [[CORE-770.3]] — global-standards-diff
- [[CORE-770.4]] — natabula-v7-handoff

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-770.N`. All four children (`.1`–`.4`) closed 2026-10-09, so this is a full-cohort audit and no early-audit decision was needed.

- [x] Read relevant source files — the four archived child notes (`archive/core/CORE-770.1.md` … `.4.md`); `SPEC/epic.md`, `SPEC/post-closure.md`, `SPEC/plan-filing.md` §"Epic parent flip"; natabula `.flaitron/PLAN.md` rows NAT-391..393 and its git log; `feedback_no_premature_slash_commands.md` from the approved memory dir; `~/.claude/CLAUDE.md` and `~/Code/AGENTS.md` (in session context)

- [x] **Best Practices Review** — `N/A`: verification pass; no code or module boundary

- [x] **Archive skim** — `archive/core/` (README table row `CORE-*`). The cohort itself is the relevant history; CORE-769.7 (NAT-391 precedent) was already cited by `.4`.

- [x] **Drift check** — every cited deliverable is live at HEAD (see Implementation Notes). `SPEC/post-closure.md` still carries the step 3 "Context-dependent skills flag" and `👇 Run in this session:` text that the `.2` memory cites.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: deliverables outside the repo (layers 1–2, memory) are checked only through what is readable without crossing the Path Access hook. The session context holds both global files, and the memory dir is approved.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — the deliverable is this note plus `.flaitron/PLAN.md`, so `touches:` is omitted and the diff is reconciled in the recap

**Discovery Notes:**

Cohort deliverables:

- **`.1` global-layer-alignment discovery** — filed `.2`–`.4` split by owner: agent memory, operator layers 1–2, natabula rows. Concluded that flaitron's contract makes no claim about the global layer, and that v7.0.0 is not blocked.
- **`.2` memory-refresh** — 7 memory files plus `MEMORY.md` moved to v7 names and paths, with the `post-closure.md` step 3 next-move shape. All of it is outside the repo; the receipt is an operator-run grep.
- **`.3` global-standards-diff** — four bullets in `~/.claude/CLAUDE.md` / `~/Code/AGENTS.md`: the skill-gates carve-out, the five-rung ladder, the `/ft-adopt` + `/natabula-adopt` pointer, and closure-commit authorization. It also found one dangling `~/.claude/skills/ft-new-project` link and drafted the relink for the operator to run.
- **`.4` natabula-v7-handoff** — NAT-392 (command-stub preconditions) and NAT-393 (NAT-195 false positives), filed in natabula commit `33452cb`, not pushed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`: verification pass, no new surface

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution — audit findings below; no inline fixes

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code

**Implementation Notes:**

**Live-state verification.**

- `.3` deliverables are present in the session-context copies of both global files:
  - the carve-out bullet after ask-first
  - Model Selection naming `[light]`/`[medium]`/`[heavy]`/`[frontier]`/`[xheavy]`
  - the new-repo pointer leading with `/ft-adopt` and naming `/natabula-adopt`
  - the `~/Code/AGENTS.md` closure-commit-authorization bullet, with push still an explicit ask
- `.2` deliverables: the `MEMORY.md` index in session context uses only v7 names. A spot-read of `feedback_no_premature_slash_commands.md` shows `/ft-file-task`, `/ft-open-epic` and `👇 Run in this session:`, and the `SPEC/post-closure.md` anchors it cites still exist.
- `.4` deliverables: natabula `.flaitron/PLAN.md` carries NAT-391, NAT-392 and NAT-393 as open `## High` rows. natabula HEAD is `33452cb`, the filing commit.

**Coherence findings.**

- **No inconsistencies surfaced.** The owner split from `.1` held: each child edited only its own layer, and no child cross-references another with a contradictory claim. Every hook false positive that `.2` and `.3` logged is a member of the class NAT-393 already carries, so `.4`'s row covers them.
- **Style parity, minor and not filed:**
  - `.2` and `.3` flipped the markdown nav chip to `✅ Completed`; `.1` and `.4` kept the template's `🟢 In progress`. That chip write was retired by CORE-042.4, since the chip is render-derived from YAML, and the archive is already mixed (216 vs 526 notes). It is cosmetic and not cohort-specific, so no row is filed.
  - `.3`'s dangling-link receipt tests `claude/skills/ft-new-project` in the repo rather than the `~/.claude/skills/` link itself. That is equivalent evidence, because the link's absolute target is the path tested.
- **Not verifiable from here, and outside flaitron's remit:**
  - whether the operator ran `.3`'s relink (`~/.claude/skills/ft-new-project` → `ft-adopt`), since the NAT-195 hook blocks agent reads of `~/.claude/skills/`
  - the natabula commit `33452cb`, which stays local until natabula's own session pushes it (no bulk pushes from flaitron)

**Misses filed:** none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — markdown-only diff; drift checks in Testing Notes

- [x] **External review** — `N/A`: no inline fix applied; the diff is this note plus PLAN stub/flip lines

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -lE 'ft-new-project|flowtron|claude/commands/ft-' <18 AI-referenced docs> → 4 files, all intentional (see doc-drift sweep)
bash tools/drift-checks.sh → 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: **no change** for all 18 (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/`/`codex/`/`cursor/`/`grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). No cohort child edited a flaitron doc. A stale-name grep (`ft-new-project`, `flowtron`, `claude/commands/ft-`) hit 4 docs, and every hit is intentional:
  - `docs/MIGRATION.md`: the retired-skills table and the v7 relink recipe
  - `README.md`: the "Formerly flowtron" section
  - `SECURITY.md` and `docs/PLATFORMS.md`: pre-v6 layout notes

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`. The boundary `.1` set held through the whole cohort: flaitron's contract stays silent on the operator's global layer.

**Final Summary:**

The global-layer-alignment cohort is coherent. Each of the four children landed in its owner's layer, every deliverable is live, no flaitron doc drifted, and no miss needed a follow-up row. Every child is now `[x]`, so `CORE-EPIC-770` flips and moves to `## Completed`.

- **Changed files:** `.flaitron/PLAN.md` (`.N` stub, parent flip, cohort moved to `## Completed`) and this note.
- **Verification:** live-state checks above; drift checks clean.
- **Refactors:** none. **Docs verdict:** no change.
- **`touches:` reconciliation:** none declared. The diff is PLAN plus this note.
- **Open outside flaitron:**
  - the operator's `~/.claude/skills/ft-new-project` relink (`.3`)
  - natabula NAT-391..393 and its unpushed `33452cb`, which natabula's own sessions handle
- **Maintainability:** no new surface.

**Archived:** 2026-10-09
