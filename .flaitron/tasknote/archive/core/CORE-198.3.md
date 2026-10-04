---
title: claude-md-consolidation
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-198, CORE-198.1, CORE-198.2, CORE-010, CORE-132, CORE-EPIC-154]
---

# CORE-198.3 | claude-md-consolidation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-198]] [[CORE-198.1]] [[CORE-198.2]] [[CORE-010]] [[CORE-132]] [[CORE-EPIC-154]]

## 🎯 Goal

Consolidate workspace-standards content from `~/code/CLAUDE.md` into `~/.claude/CLAUDE.md` (port registry, FastAPI conventions, flowtron pointer per [[CORE-010]]) and retire `~/code/CLAUDE.md`, consuming `.2`'s lift/keep/drop classification — so multi-agent setups don't depend on sub-folder CLAUDE.md discovery. User-machine edits only.

## ✅ Acceptance

- [ ] Workspace-only content lifted into `~/.claude/CLAUDE.md` (F13 General Workspace Preferences · F14 Tech Stack Tendencies · F15 Localhost Port Registry · F16 flowtron-availability pointer) — placement preserves the global file's existing tone and section hierarchy
- [ ] Within-user literal duplicates resolved by retirement (F1 Shell discipline · F2 task-lifecycle bullet · F3 closing precedence line): workspace versions die on retirement; global versions survive and global §closing line drops the `~/code/CLAUDE.md` precedence reference
- [ ] `~/code/CLAUDE.md` retired (per scoping resolution in Discovery — delete vs. stub-with-pointer)
- [ ] Global CLAUDE.md still scans as personal-coding-standards (not a workspace-standards mash-up); structural integrity verified by a top-to-bottom read after edits
- [ ] No flowtron contract-surface edits (CORE-010-style flowtron pointer in workspace file had zero flowtron-side references per `.1`/`.2` drift check — nothing to update on the flowtron side)
- [ ] Phase 4 doc-drift sweep verdicts across `_project/tasknote/README.md` §"AI-referenced docs" recorded (default: no change — `.3` is user-machine edits only)

## 🧩 Subtasks

- [ ] Phase 1: archive skim + drift recheck + structured-ask on placement/retirement strategy
- [ ] Phase 2: lift F13/F14/F15/F16 into `~/.claude/CLAUDE.md` per agreed placement; drop the workspace-precedence reference from the global closing line; retire `~/code/CLAUDE.md` per agreed mechanism
- [ ] Phase 3: read-through verification on the final `~/.claude/CLAUDE.md`; confirm no orphaned references; ensure section hierarchy + tone hold
- [ ] Phase 4: doc-drift sweep verdicts + flip `.3` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-198]] — parent epic (context-chain-portability)
- [[CORE-198.1]] — Discovery that locked hybrid scope (children may touch user-machine files) and N=5 cohort sizing
- [[CORE-198.2]] — Redundancy audit that produced the lift/keep/drop classification this child executes (F1-F3 literal dups → consumed by retirement; F13-F16 → lift to global)
- [[CORE-010]] — added the flowtron pointer to `~/code/CLAUDE.md`; this task migrates that pointer to `~/.claude/CLAUDE.md`
- [[CORE-132]] — `user-idiosyncrasy comb` precedent: cohort of follow-up tickets from one audit (CORE-199, CORE-200 here are the parallel post-`.2` follow-ups); `.3` is the in-scope consolidation
- [[CORE-EPIC-154]] — multi-agent-portability epic; locked contract-layer agent-neutrality and motivates why sub-folder CLAUDE.md discovery is a multi-agent liability

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2`'s findings table fully classifies the 20 cross-corpus rules into actionable buckets (4 lift / 3 within-user-dup-consumed-by-retirement / 11 keep-personal / 2 follow-up tickets). `.3`'s scope is exactly the execution of those bucket assignments scoped to user-machine files — no contract-surface edits. PLAN.md line is 50w (under cap). No re-scope warranted.

- [x] Read relevant source files:
  - `~/.claude/CLAUDE.md` (global, 45 lines) — 8 sections incl. closing pointer to project CLAUDE.md / workspace CLAUDE.md
  - `~/code/CLAUDE.md` (workspace, 47 lines) — 5 sections + 9-row port table + reserved-ports block + closing precedence line
  - `_project/tasknote/archive/core/CORE-198.2.md` — full findings table consumed as input
  - `_project/tasknote/archive/core/CORE-198.1.md` — Discovery decisions (hybrid scope; no in-place flowtron contract edits; `.4` is independent)
  - `_project/tasknote/README.md` §"AI-referenced docs" — confirmed 9-entry doc set for Phase 4 sweep

- [x] **Archive skim** — `_project/tasknote/archive/core/`; targeted grep for `~/.claude/CLAUDE.md` / `~/Code/CLAUDE.md` / `~/code/CLAUDE.md` hit 9 archives: [[CORE-008]] (InvisiPaw playbook), [[CORE-010]] (the flowtron-pointer add — already in 🔗 Related), [[CORE-011]] (TasknoteSystem deletion), [[CORE-037]] (token-cost audit), [[CORE-042.1]] / [[CORE-042.8]] (workflow rethink), [[CORE-132]] (idiosyncrasy comb), and the two epic siblings [[CORE-198.1]] / [[CORE-198.2]]. Nothing surfaces a load-bearing prior touch beyond what `.2`'s archive skim already consolidated. No new precedent.

- [x] **Drift check** — all paths cited in `.2`'s findings table still valid at HEAD:
  - `~/.claude/CLAUDE.md` exists (44 lines, mtime 2026-05-17) ✓
  - `~/code/CLAUDE.md` exists (46 lines, mtime 2026-05-22) ✓ — both pre-date `.2`'s archive (2026-05-25); no fresh third-party rewrites
  - Flowtron contract surface grep for `~/code/CLAUDE.md` outside `_project/`: zero hits in `README.md` / `SPEC.md` / `SPEC/` / `docs/` / `templates/` / `claude/` / `CONTRIBUTING.md` / `SECURITY.md`. Only references live in (a) the active PLAN.md task line (this task's own description), (b) the active tasknote `_project/tasknote/CORE-198.3.md` (this file), and (c) the [[CORE-010]] archive stub line in `## Completed` (historical, fine). Re-confirms `.2`'s drift finding: **zero flowtron-side rename burden** at retirement.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **structured ask resolved 2 placement/retirement questions** (see Discovery Notes "Resolved placement" table below).

- [x] Subtasks above populated with concrete, ordered steps (see ✅ Acceptance and 🧩 Subtasks above).

**Discovery Notes:**

**Resolved placement decisions (via structured ask):**

| # | Question | Resolution | Affects |
|---|---|---|---|
| 1 | Lift placement strategy | **Integrate where overlap exists, rest as new sections** — F13 bullets fold into existing §Core Principles / §Execution & Verification; F16 + workflow-philosophy neighbors fold into §Execution & Verification (already carries F2); F14 §Tech Stack Tendencies + F15 §Localhost Port Registry land as new discrete sections (no natural host) | Phase 2 edits land in 4 places: §Core Principles (+2 bullets) · §Execution & Verification (F2 bullet refined + 3 new bullets) · 2 new sections appended after §Model Selection · closing line (F3, drop `~/code/CLAUDE.md` reference) |
| 2 | Retirement mechanism | **Delete `~/code/CLAUDE.md` outright** — matches the epic's stated goal (multi-agent setups don't depend on sub-folder CLAUDE.md discovery); a stub would preserve the very discovery surface the retirement eliminates | Phase 2 includes `rm /Users/fakeneuron/Code/CLAUDE.md` after the global file is rewritten |

**Per-bullet lift mapping (F13 + F16 + neighbors):**

| Source bullet (workspace) | Destination (global) | Verbatim or refined |
|---|---|---|
| F13.a "readability, maintainability, explicit" | §Core Principles (new bullet after "Prefer simplicity") | Verbatim |
| F13.b "prefer tests for non-trivial" | §Execution & Verification (new bullet) | Verbatim |
| F13.c "atomic commits" | §Execution & Verification (new bullet) | Verbatim |
| F13.d "document major architecture/design decisions" | §Core Principles (new bullet) | Verbatim |
| Workspace §Shared Workflow Philosophy bullet 1 (descriptive context "PLAN.md or plan.json + 4-phase tasknotes") | §Execution & Verification — merged into the existing F2 bullet ("When a project defines its own tasknote / plan / workflow system, follow it precisely.") | Refined: existing F2 bullet absorbs the "(PLAN.md or plan.json + 4-phase tasknotes)" parenthetical |
| Workspace §Shared Workflow Philosophy bullet 2 | (F2 dup — dies on retirement; global keeps canonical) | n/a |
| Workspace §Shared Workflow Philosophy bullet 3 "prefer project's own task tracking over ad-hoc" | §Execution & Verification — merged into the same F2 bullet ("…follow it precisely. Prefer the project's own task tracking over ad-hoc notes.") | Refined into the same bullet for compactness |
| F16 flowtron pointer (bullet 4) | §Execution & Verification (new multi-line bullet) | Verbatim |

**Section append (F14 + F15):**

- §Tech Stack Tendencies — verbatim 3 bullets from workspace
- §Localhost Port Registry — verbatim section: intro line + 9-row markdown table + reserved-ports list + new-project guidance paragraph

**Closing-line edit (F3):**

- Current global L45: `Project-specific architecture, commands, non-negotiables, and workflows live in the project's own CLAUDE.md or `~/code/CLAUDE.md` (they take precedence where they conflict).`
- New: drop ` or `~/code/CLAUDE.md`` clause → `Project-specific architecture, commands, non-negotiables, and workflows live in the project's own CLAUDE.md (they take precedence where they conflict).`

**Style preservation:** source files use Unicode smart quotes / curly apostrophes (e.g., "improve", "project's"); Write preserves these character-for-character to avoid spurious diff noise vs. user's existing aesthetic.

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced no significant scope deviation — `.3` executes exactly as filed (consume `.2`'s F13/F14/F15/F16 lifts + retire `~/code/CLAUDE.md`). The two clarifying questions resolved execution-detail placement choices, not scope drift. → **Skip 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-132]]'s execute-the-audit pattern, but inverted: where CORE-132 surfaced findings as discrete PLAN.md follow-up tickets (the recommendations-only audit shape), `.3` *consumes* findings as direct edits to the corpora `.2` classified. The cross-corpus user-side consolidation has no prior precedent in the archive — the closest analogue is the CORE-132 → CORE-133..137 cohort, which executed lifts in separate child tickets per finding. `.3` collapses 7 findings (F1 / F2 / F3 / F13 / F14 / F15 / F16) into one consolidation pass because they share an enabling condition (workspace retirement) and an output destination (single global file). Justification for the single-pass shape: edits are deterministic from `.2`'s table; user already gave explicit go via the structured ask; per-finding tickets would fragment a coherent merge.
- [x] Implemented the minimal solution — two file-system operations:
  1. **Write** `/Users/fakeneuron/.claude/CLAUDE.md` (full rewrite; 76 lines; +32 net lines vs. prior 44-line version)
  2. **Remove** `/Users/fakeneuron/Code/CLAUDE.md` (deleted; ls confirms absence)
- [x] Updated/added tests for non-trivial behavior — N/A (markdown content edits; verification gates run inline in Phase 3 below).

**Implementation Notes:**

**Final global file shape (9 sections, 76 lines):**

| Section | Lines | Change |
|---|---|---|
| §Scope & Safety | 5-8 | unchanged |
| §Core Principles | 10-17 | **+2 bullets** (L15 readability/maintainability/explicit from F13a · L17 document major decisions from F13d) |
| §Surgical & Safe Changes | 19-23 | unchanged |
| §Shell discipline | 25-27 | unchanged (canonical home for F1 — workspace dup died at retirement) |
| §Execution & Verification | 29-36 | **+3 bullets + 1 refined bullet** (L33 prefer tests from F13b · L34 atomic commits from F13c · L35 refined F2 bullet merging workspace bullets 2+3 with "(PLAN.md or plan.json + 4-phase tasknotes)" parenthetical · L36 flowtron pointer from F16) |
| §Communication | 38-41 | unchanged |
| §Model Selection | 43-46 | unchanged (CORE-199 is the user-machine reduction follow-up) |
| **§Tech Stack Tendencies** | 48-51 | **new section (F14 lift)** |
| **§Localhost Port Registry** | 53-72 | **new section (F15 lift)** — intro line + 9-row table + reserved-ports list + new-project guidance |
| Closing pointers | 74, 76 | L74 unchanged; L76 **F3 dropped** `~/code/CLAUDE.md` clause |

**Per-finding consumption status:**

| Finding | Bucket | Status |
|---|---|---|
| F1 Shell discipline literal dup | `delete-as-duplicate` (within-user) | ✓ workspace died at retirement; global §Shell discipline preserved canonical |
| F2 task-lifecycle bullet | `delete-as-duplicate` (within-user) | ✓ workspace died; global L35 absorbed workspace bullets 2+3 as a unified refined bullet |
| F3 closing precedence line | `delete-as-duplicate` (within-user) | ✓ workspace died; global L76 drops `~/code/CLAUDE.md` reference |
| F13 General Workspace Preferences (4 bullets) | `keep-personal` w/ `.3` lift | ✓ all 4 bullets lifted into global (§Core Principles +2, §Execution & Verification +2) |
| F14 Tech Stack Tendencies (3 bullets) | `keep-personal` w/ `.3` lift | ✓ new §Tech Stack Tendencies section appended after §Model Selection |
| F15 Localhost Port Registry | `keep-personal` w/ `.3` lift | ✓ new §Localhost Port Registry section (verbatim incl. 9-row table, reserved ports, new-project guidance) |
| F16 flowtron-availability pointer | `keep-personal` w/ `.3` lift | ✓ lifted as L36 in §Execution & Verification (verbatim 1-line bullet) |
| Workspace §Shared Workflow Philosophy bullet 1 (descriptive context) | — | ✓ absorbed into L35 as the "(PLAN.md or plan.json + 4-phase tasknotes)" parenthetical |

**Out-of-scope (per `.2`):** CORE-199 (§Model Selection user-machine reduction) and CORE-200 (§Shell discipline agent-neutral half lift to flowtron) are filed as separate follow-up tickets — not touched here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown content edits to user-machine files; no executable surface).
- [x] Ran lint/type-check on changed code — N/A; markdown read-through verification below (substituting for automated tests, per [[CORE-132]] precedent).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

**Verification gates (substituting for automated tests):**

1. **File-state check** — `~/.claude/CLAUDE.md` 76 lines (was 44); `~/code/CLAUDE.md` removed (`ls` returns "No such file or directory"). ✓
2. **Section count** — 9 sections (was 7; +§Tech Stack Tendencies, +§Localhost Port Registry). ✓
3. **No orphaned workspace-CLAUDE.md references** — `grep -nE '~/code/CLAUDE\.md|~/Code/CLAUDE\.md' ~/.claude/CLAUDE.md` returned zero hits. F3 cleanup verified. ✓
4. **Top-to-bottom read** — global file still reads as "Personal Coding Standards (Global)": principle-flavored sections (Scope, Core, Surgical, Shell, Execution, Communication, Model) hold their existing flow; lifted content sits naturally either as same-section bullet additions (F13/F16) or tail sections (F14/F15) — title still fits since the lifted sections are coding-adjacent preferences and machine state, not workflow contract. ✓
5. **Quote-style preservation** — Unicode smart quotes / curly apostrophes preserved character-for-character in both retained and lifted content ("improve", "future-proofing", "project's"); no spurious ASCII downgrades introduced. ✓
6. **F1/F2/F3 within-user dup resolution** — verified by source disappearance (workspace file gone) + canonical-side preservation (global §Shell discipline intact; L35 refined F2 bullet present; L76 F3-cleaned closing line present). ✓
7. **F13/F14/F15/F16 lift completeness** — per-bullet mapping table in Implementation Notes accounts for every workspace bullet: F13's 4 bullets all present in global; F14's 3 bullets all present; F15 verbatim table + reserved-ports list + new-project guidance all present; F16 pointer present at L36. ✓
8. **Multi-agent discovery integrity** — after retirement, Claude Code's cwd walk-up from `~/code/<project>/` finds no `~/code/CLAUDE.md` and falls through to `~/.claude/CLAUDE.md` (the global). Grok-cli / Codex-cli / Cursor / Amp / Aider all read AGENTS.md (not CLAUDE.md) per [[CORE-129]], so they are unaffected. Achieves the epic's stated goal. ✓

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (signals clear — see Final Summary below; surfaces inline on conditional skip per SPEC §"Conditional skip rule")

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change |
| `docs/PLATFORMS.md` | no change |

User-machine-only execution; zero flowtron-contract-side ripple. Greps for `~/code/CLAUDE.md` / `workspace CLAUDE.md` / `workspace.standards` across all 9 AI-ref docs returned zero hits — confirms `.1`/`.2` drift finding that flowtron contract has no rename burden.

**Final Summary:**

Lifted workspace standards (port registry, FastAPI conventions, flowtron pointer, general workspace preferences) into `~/.claude/CLAUDE.md` and deleted `~/code/CLAUDE.md`, consuming `.2`'s lift/keep/drop classification. After retirement, `~/.claude/CLAUDE.md` is the single user-machine source of truth — Claude Code's cwd walk-up from `~/code/<project>/` falls through to global directly, matching multi-agent discovery semantics that Grok/Codex/Cursor/Amp/Aider already follow via AGENTS.md.

Technical detail:
- **2 file-system operations:** Write `~/.claude/CLAUDE.md` (44 → 76 lines; +32 net) · `rm ~/code/CLAUDE.md`.
- **2 new sections** (was 7; now 9): §Tech Stack Tendencies (F14, verbatim 3 bullets) + §Localhost Port Registry (F15, verbatim — intro line + 9-row markdown table + reserved-ports list + new-project guidance).
- **5 in-section edits:** §Core Principles +2 bullets (F13a readability/maintainability/explicit · F13d document major decisions) · §Execution & Verification +3 bullets (F13b prefer tests · F13c atomic commits · F16 flowtron pointer) + 1 refined bullet (F2 absorbing workspace §Shared Workflow Philosophy bullets 1+2+3 with "(PLAN.md or plan.json + 4-phase tasknotes)" parenthetical) · closing pointer line drops `~/code/CLAUDE.md` clause (F3).
- **7 findings consumed in one pass:** F1 (Shell discipline literal dup → dies on retirement; global §Shell discipline intact as canonical) · F2 (task-lifecycle → absorbed into refined unified bullet) · F3 (closing precedence → `~/code/CLAUDE.md` clause dropped) · F13 (4 bullets lifted) · F14 (new §, lifted) · F15 (new §, lifted) · F16 (lifted as bullet).
- **Out-of-scope (deliberate):** CORE-199 (§Model Selection user-machine reduction — finding F4) and CORE-200 (§Shell discipline agent-neutral half lift to flowtron — finding F19) remain separate follow-up tickets per `.2`. F5-F12, F17, F18, F20 are `keep-personal-no-action` and require no edit.
- **Pattern survey insight:** the cross-corpus user-side consolidation has no prior precedent in the archive. The closest analogue ([[CORE-132]] → CORE-133..137 cohort) executed lifts in separate per-finding tickets; `.3` collapses 7 findings into one pass because they share an enabling condition (workspace retirement) and a single output destination (the global file). Justified by `.2`'s explicit "consumed by `.3`" annotations + user's structured-ask go.
- **Verification gates (Phase 3):** file-state confirmed (76 lines / 0 lines) · 9 sections present · 0 orphaned workspace-CLAUDE.md references in global · top-to-bottom read still scans as "Personal Coding Standards (Global)" · Unicode smart-quotes preserved character-for-character · per-finding consumption table accounts for all 7 in-scope findings · multi-agent discovery integrity confirmed (cwd walk-up from `~/code/` finds no surface; falls through to global).
- **Net for the epic:** `.3` cleanly executes `.2`'s recommendations. `.4` (grok-adoption-verification) is independent and remains unblocked — can fire next. `.5` audit closes the epic per SPEC/epic.md.

**Archived:** 2026-05-25
