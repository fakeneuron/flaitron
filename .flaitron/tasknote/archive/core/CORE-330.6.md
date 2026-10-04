---
title: loop-integration audit
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-330, CORE-330.1, CORE-330.2, CORE-330.3, CORE-330.4, CORE-330.5]
---

# CORE-330.6 | loop-integration audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-330]]

## 🎯 Goal

Verify the completed `CORE-EPIC-330` (`loop-integration`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-330.6 — audit CORE-EPIC-330` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-330.6` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-330.6.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-330` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-330.6` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-330]] — parent epic (loop-integration); this audit closes it

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-330` + all five children (.1–.5) walked in skill Step 2; `.6` is the highest `.N`, all siblings `[x]`, no open siblings → proceed silently.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-330.6`; Step 2 pre-flight passed (parent active, all implementation children closed, audit is highest `.N`). This audit captures cohort state at close: all five children (.1 discovery · .2 loop-contract · .3 heartbeat-template · .4 ft-goal-task-skill · .5 loop-wiring-doc-sync) landed same-day 2026-07-02 as a full cohort — no early-audit / partial-cohort decision.

- [x] Read relevant source files — read all five archived cohort tasknotes (`archive/core/CORE-330.1–.5.md`) in full: each child's Final Summary + Implementation Notes captured in Discovery Notes below. Also `SPEC/epic.md` (lifecycle), `.flowtron/tasknote/README.md` (AI-referenced ledger).

- [x] **Archive skim** — self-referential for this epic audit (cohort children ARE the archive entries just read). The epic touched surfaces with prior tasknote history: CORE-328.4 (README §"Sessions, loops, and sub-agents", reconciled by .2) and CORE-329.2 (ft-update wiring fan-out precedent that .5 mirrored byte-for-byte) — both already load-bearing in the cohort's own Discovery notes, no additional non-cohort context needed.

- [x] **Drift check** — verified every cohort deliverable at HEAD: `SPEC/loop.md` exists; SPEC.md §"Loop tasks" (2 hits) + README §"Sessions, loops, and sub-agents" + VISION loop bullet present; `templates/loop-heartbeat-template.md` exists; `claude/skills/ft-goal-task/SKILL.md` + `claude/commands/ft-goal-task.md` exist; AGENTS-snippet = 22 `ln -s`, `claude/commands/` = 24 stubs; stale-reference sweep (`ships 23`/`wires ten`/`seven tasknote family`/`all twenty symlinks`/`~53`) = 0 hits; `/ft-goal-task` present across SPEC.md, README, MIGRATION, GLOSSARY, ft-flowtron, AGENTS.md, SPEC/loop.md. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Full cohort closed same-day; scope is the standard epic-audit verification pass (doc-drift sweep + coherence inventory). No cohort-scope ambiguity.

- [x] Subtasks above populated with concrete, ordered steps — Step 3 scaffold pre-filled the canonical epic-audit subtask list; no scope shift surfaced in Discovery.

**Discovery Notes:**

**Cohort deliverables inventory (read from archived tasknotes):**

- **CORE-330.1 | discovery** — Filed the epic + scoped children `.2–.5` into PLAN.md. Load-bearing finding: CORE-328.4 (same-day) had landed README §"Sessions, loops, and sub-agents" with a descriptive-only "flowtron ships no loop runner… by design" stance; operator resolved via full-scope-with-reconciliation: **Claude Code's `/loop` is the runtime; flowtron ships the markdown contract the loop reports to.**
- **CORE-330.2 | loop-contract** — Shipped `SPEC/loop.md` (new lazy module: gate collapse → `--fast`/commit-per-verified-iteration, destructive→park; per-cycle relevance gate; `loop-max`; `## 🔁 Iterations` log; three additive frontmatter keys `loop:`/`loop-max:`/`loop-last-run:`, no `loop-interval`). Edits: SPEC.md §"Loop tasks" pointer + §"PR archetypes" mirror bullet; README §"Sessions, loops, and sub-agents" boundary redraw; docs/VISION.md §"What we won't accept" loop bullet; docs/AGENT-NEUTRALITY.md ledger entry for the `/loop` contract surface.
- **CORE-330.3 | heartbeat-template** — Shipped `templates/loop-heartbeat-template.md` (5-section: cheap cycle pre-check · first-match-wins duties · PLAN write-back ≤50w · `.flowtron/LOOP-LOG.md` write-back · NEVER envelope). Defined the LOOP-LOG convention. Dogfood-fixed a stale `templates/` enumeration in `.flowtron/tasknote/README.md:11` (5→7 files).
- **CORE-330.4 | ft-goal-task-skill** — Shipped `claude/skills/ft-goal-task/SKILL.md` + `claude/commands/ft-goal-task.md` (sibling of `/ft-debug`: verify-command-per-Acceptance-criterion Phase 1 rule; inline Phase 2↔3 loop body; scaffold adds loop frontmatter + `🔁 Iterations` section; `--worktree` hands off to `/ft-worktree-start`). Explicitly deferred ALL wiring to `.5`, and flagged the SPEC §"Skill namespace" entry as needing `.5`'s widening.
- **CORE-330.5 | loop-wiring-doc-sync** — Wired `/ft-goal-task` + heartbeat template into 9 adopter surfaces (AGENTS-snippet 20→22 symlinks · AGENTS.md · ft-new-project Steps 3/7/8 · MIGRATION §1.2/1.6/1.7 · GLOSSARY +3 entries · README · ft-flowtron table · SPEC §"Skill namespace" · SPEC/loop.md heartbeat pointer). Doc-drift sweep additionally caught docs/PLATFORMS.md (matrix row + 23→24 stub counts). Mirrored the CORE-329.2 fan-out precedent.

**Coherence hypothesis (to verify in Phase 2):** cohort is internally consistent by construction — each child cites its predecessors as wikilinks and consumes their contract (.3/.4 consume .2's `SPEC/loop.md`; .5 wires .3+.4). The runtime-vs-contract boundary phrasing is the load-bearing cross-cutting concept — Phase 2 verifies it reads consistently across `SPEC/loop.md`, README, VISION, and SPEC.md. Counts (22/24) and stale-sweep already verified clean at HEAD in the drift check.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A. Audit is a verification pass over existing cohort deliverables; no new code surface. No inline fix needed (coherence pass surfaced nothing to correct).

- [x] Implemented the minimal solution — verification work, no code edits. Ran the cohort coherence checklist (Acceptance criteria 2–4); findings below.

- [x] Updated/added tests for non-trivial behavior — N/A (no code change).

**Implementation Notes:**

**Cohort children inventoried (deliverables, one bullet each):**

- **.1 discovery** — filed `.2–.5` scopes + parent boundary sentence into PLAN.md; deliverable was the child task list, no code.
- **.2 loop-contract** — `SPEC/loop.md` (new lazy module) + SPEC.md §"Loop tasks" pointer & §PR-archetypes mirror + README boundary redraw + VISION won't-accept bullet + AGENT-NEUTRALITY ledger entry.
- **.3 heartbeat-template** — `templates/loop-heartbeat-template.md` + `.flowtron/LOOP-LOG.md` convention + fixed stale `templates/` list in tasknote README.
- **.4 ft-goal-task-skill** — `claude/skills/ft-goal-task/SKILL.md` + `claude/commands/ft-goal-task.md` (sibling of `/ft-debug`).
- **.5 loop-wiring-doc-sync** — wired `/ft-goal-task` + heartbeat template into 9 adopter surfaces + PLATFORMS via doc-drift; mirrored the CORE-329.2 fan-out precedent.

**Coherence findings — no inconsistencies surfaced:**

- **Runtime-vs-contract boundary** reads consistently across all four cross-cutting surfaces (`SPEC/loop.md`, README §"Sessions, loops, and sub-agents", docs/VISION.md §"What we won't accept", SPEC.md §"Loop tasks" + §PR-archetypes). The load-bearing phrase "contract the loop reports to" appears verbatim in each; the VISION↔SPEC won't-accept mirror is intact (1:1).
- **Shared loop vocabulary is uniform** — frontmatter keys `loop:` / `loop-max:` (16×) / `loop-last-run:` (6×) with the deliberate single "no `loop-interval`" rationale; `## 🔁 Iterations` section name (plural, 16×, zero singular variants); LOOP-LOG canonical path `.flowtron/LOOP-LOG.md` throughout (bare `LOOP-LOG` hits are prose). GLOSSARY's three new terms (goal loop · heartbeat · iteration log) each cross-reference `SPEC/loop.md`.
- **No contradictory cross-refs** — every child cites its predecessors as valid `[[ID]]` wikilinks; `.3`/`.4` consume `.2`'s contract, `.5` wires `.3`+`.4`; the dependency chain is acyclic and each link resolves.
- **No regressions in earlier-shipped surfaces** — drift check verified all cohort deliverables at HEAD; wiring counts hold (22 symlinks / 24 command stubs); stale-reference sweep (`ships 23`/`wires ten`/`seven tasknote family`/`all twenty symlinks`/`~53`) returns 0 across all 11 ledger docs.

**Inline fixes applied:** none — nothing to correct.

**Misses logged as `/ft-file-followup` candidates:** none. The one pre-existing gap the cohort flagged-but-left (README §Bootstrapping omits `/ft-update`, a CORE-329.2-era omission — orthogonal to this cohort) is not a loop-integration miss; not filed here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changed; audit is markdown-prose verification).

- [x] Ran lint/type-check on changed code — N/A (no code edits landed). Deterministic verification ran instead: file-existence, count, and stale-reference sweeps at HEAD (see Discovery drift check + Implementation Notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Verification was deterministic grep-based (no test surface): all five cohort deliverables exist at HEAD; boundary phrasing consistent across 4 surfaces; loop vocabulary uniform; counts 22/24 hold; stale sweep = 0 across all 11 AI-referenced ledger docs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line)** — cumulative sweep across all 11 AI-referenced ledger entries; the cohort's per-task Phase 4 sweeps (.2–.5) collectively kept every entry current, and this final pass confirms no residual slice-local staleness:

  - `README.md` — **no change** (already carries the §"Sessions, loops, and sub-agents" redraw + §Bootstrapping eight-skill roster + ~56 glossary count from .2/.5; verified consistent at HEAD).
  - `SPEC.md` — **no change** (§"Loop tasks" pointer, §"Skill namespace" `/ft-goal-task`, §PR-archetypes loop mirror all present from .2/.5).
  - `docs/MIGRATION.md` — **no change** (§1.2/1.6/1.7 loop-wiring counts current from .5; stale sweep = 0).
  - `claude/AGENTS-snippet.md` — **no change** (22 `ln -s` lines + §Workflow roster `/ft-goal-task` from .5).
  - `docs/CONVENTIONS.md` — **no change** (commits/versioning/CHANGELOG doctrine; no loop content).
  - `CONTRIBUTING.md` — **no change** (solo-maintenance model; untouched by the cohort).
  - `SECURITY.md` — **no change** (loop parks destructive steps via `status: blocked`, inside the existing threat model — .2/.4/.5 each confirmed no new attack surface).
  - `docs/AGENT-NEUTRALITY.md` — **no change** (the `/loop` contract-layer surface is logged at line 37 from .2; framed neutrally "or any equivalent runner").
  - `docs/PLATFORMS.md` — **no change** ("Eight tasknote skills" incl. `/ft-goal-task` + 24 command/skill counts from .5's doc-drift sweep).
  - `claude/CAPABILITIES.md` — **no change** (Claude Code capability-trigger reference; loop cohort changes no triggers; last-verified stamp `v5.7.2 · 2026-06-14` is version-pinned, not roster-derived).
  - `docs/AGENT-COMPAT.md` — **no change** ("full `ft-*` bundle shipped", no count/roster; version-pinned stamps).

- [x] Closed — PLAN.md `.6` line flipped to stub form `Completed 2026-07-02.` (kept nested under `CORE-EPIC-330`; parent + cohort move to `## Completed` only on Step 9 parent-flip confirmation) and tasknote moved to `.flowtron/tasknote/archive/core/CORE-330.6.md`.

- [x] Recap drafted (bundled into Step 9's 📦 ready-to-commit gate alongside the parent-flip prompt).

**Final Summary:**

Audited the completed `CORE-EPIC-330` (`loop-integration`) cohort — **no inconsistencies surfaced; no follow-ups to file.** The five same-day children (.1 discovery · .2 `SPEC/loop.md` contract + boundary redraw · .3 heartbeat template · .4 `/ft-goal-task` skill · .5 adopter wiring + doc sync) sit coherently: the load-bearing runtime-vs-contract boundary phrase "contract the loop reports to" reads verbatim across all four cross-cutting surfaces (`SPEC/loop.md`, README, VISION, SPEC.md) with the VISION↔SPEC won't-accept mirror intact; the shared loop vocabulary is uniform (`loop:`/`loop-max:`/`loop-last-run:` frontmatter with the deliberate no-`loop-interval` rationale, `## 🔁 Iterations` plural section name, canonical `.flowtron/LOOP-LOG.md` path, three GLOSSARY terms each cross-referencing `SPEC/loop.md`); every child's `[[ID]]` cross-refs resolve on an acyclic dependency chain; and no regressions in earlier surfaces (wiring counts 22 symlinks / 24 command stubs hold, stale-reference sweep = 0 across all 11 AI-referenced ledger docs). Cumulative doc-drift sweep: all 11 ledger entries **no change** — the per-task Phase 4 sweeps across .2–.5 already kept every entry current, so no cumulative slice-local staleness remained for the audit to catch. No code edits, no inline fixes — pure verification pass.

**Archived:** 2026-07-02
