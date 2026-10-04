---
title: cursor-dogfood
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438, CORE-438.4, CORE-438.N]
---

# CORE-438.5 | cursor-dogfood

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]]

## 🎯 Goal

Dogfood flowtron under Cursor via `docs/DOGFOOD.md`, replace the PLATFORMS.md Cursor stub with a first-use trigger table, stamp AGENT-COMPAT `dogfooded`, and enrol Cursor as the 4th per-release dogfood-gate row.

## ✅ Acceptance

- [x] `docs/DOGFOOD.md` three steps run under Cursor this session; evidence logged (contract version, cue-render, Phase-1 drive, clean `git status` at Step 3 boundary)
- [x] `docs/PLATFORMS.md` Cursor stub replaced with a real trigger table covering native structured ask, Task subagents, modes, `/model` + `/clear` (and other observed triggers in the Grok/Codex table shape)
- [x] `docs/AGENT-COMPAT.md` Cursor row `Last verified` flipped to `v5.16.0 · 2026-08-12 (dogfooded)`; PLATFORMS Cursor footer stamped in lockstep
- [x] Cursor enrolled in the per-release dogfood gate (`ft-release` §5/§7 walk + AGENT-COMPAT obligation prose + DOGFOOD.md stamp-location table) as the 4th gated row
- [x] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Run DOGFOOD Step 1 (contract comprehension) + Step 2 (cue-render check); log evidence
- [x] Run DOGFOOD Step 3 Phase-1 drive on CORE-438.N (read-only, no scaffold); confirm `git status` clean at that boundary
- [x] Draft + write PLATFORMS.md Cursor trigger table from first-use observation
- [x] Stamp AGENT-COMPAT + PLATFORMS Last verified; update Pre-adoption / Reading-the-cells prose for 4 gated rows
- [x] Enrol Cursor in `ft-release` §5/§7 dogfood walk (hard-coded Claude/Grok/Codex lists → include Cursor) + DOGFOOD.md recording locations
- [x] Phase 3 verification + Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-438]] — parent epic (cursor-wiring)
- [[CORE-438.4]] — predecessor: surface integration; left trigger table + dogfood stamp to this child
- [[CORE-438.N]] — follow-up audit (terminal); dry Phase-1 drive target for DOGFOOD Step 3

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Cursor thin wiring shipped ([[CORE-438.3]]) and surface-propagated ([[CORE-438.4]]); AGENT-COMPAT Cursor row is still `unverified` and PLATFORMS still carries the "trigger table pending" stub. [[CORE-438.1]] locked enrolment as the 4th gated row after a real dogfood. This session is already under Cursor — the dogfood surface is live. No Re-scope/De-scope signal.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

PLAN.md line, `docs/DOGFOOD.md`, `docs/PLATFORMS.md` (Cursor stub + Grok/Codex trigger-table shape), `docs/AGENT-COMPAT.md` (Cursor row + Reading-the-cells gate prose), `claude/skills/ft-release/SKILL.md` §5/§7 dogfood walk, archived [[CORE-438.1]] / [[CORE-438.4]] / [[CORE-267.2]] / [[CORE-406]], `claude/CAPABILITIES.md` trigger-table shape for parity. No probe needed — read set is known and narrow.

### What upstream locked (inherit)

| Decision | Source | Effect on `.5` |
|---|---|---|
| Cursor joins per-release dogfood gate as 4th row | [[CORE-438.1]] Resolved scoping | Enrol in `ft-release` §5/§7 + AGENT-COMPAT obligation prose |
| Trigger table deferred from `.4` | [[CORE-438.4]] | Replace stub; `.4` already flipped surface classification |
| Last verified stays `unverified` until `.5` | [[CORE-438.4]] Acceptance | Stamp both AGENT-COMPAT + PLATFORMS footer |
| Parallel dogfood stamp ownership | [[CORE-406]] | This session writes stamps (not a parallel release cut) |

### Archive skim (load-bearing)

- [[CORE-438.1]] — Cursor primitives probe (structured ask, Task, modes, `/model`+`/clear`); enrolment locked to `.5`
- [[CORE-438.4]] — left stub→trigger-table + dogfood stamp explicitly to this child
- [[CORE-267.2]] / [[CORE-267.3]] — gate convention + `ft-release` walk; hard-coded "Claude / Grok / Codex" lists are the enrolment edit surface
- [[CORE-406]] — only release-driving session writes stamps under parallel dogfood; this is a first-dogfood write, not a release cut — write here is correct
- [[CORE-269]] — authored `docs/DOGFOOD.md`; Step 3 "write no files" is the verification boundary, then Recording-the-result authorizes stamp writes
- [[CORE-257]] / [[CORE-258]] — Grok/Codex first-use dogfood precedents for trigger-table + stamp shape

### Drift check

- `docs/DOGFOOD.md` three steps + Recording-the-result — present; Cursor currently falls under "Other agents → matrix row only". After a real PLATFORMS trigger table exists, Cursor should join Grok/Codex in the matrix+footer stamp pair (enrolment implies that).
- `docs/PLATFORMS.md` §"Cursor (thin wiring shipped; trigger table pending)" still the stub — PLAN deliverable still open.
- `docs/AGENT-COMPAT.md:39` Cursor Last verified = `unverified`; obligation prose still says "today: Claude / Grok / Codex".
- `ft-release` §5 still enumerates Claude/Grok/Codex only — enrolment target.
- SPEC version `v5.16.0` — stamp prefix for this dogfood.
- No SPEC *semantic* conflict; neutrality preserved (docs/skills name Cursor; contract does not grow Cursor-specific terms).
- Archived factual claims: `.1`/`.4` already tracked the pending stub/stamp; this task falsifies those "pending/unverified" claims by design — no superseded-pointer owed on archived notes that correctly deferred the work.

### Best Practices Review

Touched boundary is currency docs + release-skill gate walk. Dependency direction: stamps and trigger tables live in docs; `ft-release` *reads* them. Extend the existing Grok/Codex trigger-table shape and the three-agent gate walk — do not invent a fourth stamp format or a parallel checklist artifact. Duplication risk: restating Cursor install commands — point at `cursor/AGENTS-snippet.md` / worked example instead. No refactor of `claude/` skill bodies beyond the §5/§7 enumeration edits.

### Clarifications

No clarifications needed. Explicit assumptions:
1. This Cursor session (Grok 4.5 via Cursor) **is** the dogfood session.
2. DOGFOOD Step 3 dry-drives Phase 1 on **CORE-438.N** (read-only, no scaffold) so the Step-3 `git status` clean check is honest; stamp/doc writes follow as task deliverables after that boundary.
3. Stamp locations for Cursor after enrolment = AGENT-COMPAT matrix + PLATFORMS Cursor footer (same pair as Grok/Codex); update DOGFOOD.md Recording-the-result accordingly.
4. Trigger rows named in PLAN (structured ask, Task subagents, modes, `/model`+`/clear`) plus table-shape peers (skill invocation, force-skip/`--fast`, procedure pointer, effort) filled from this session + [[CORE-438.1]] probe evidence.
5. Enrolment edits are additive list updates (Claude/Grok/Codex → +Cursor); no gate-mechanism redesign.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the Grok/Codex PLATFORMS trigger-table shape and the three-agent `ft-release` §5/§7 dogfood walk — Cursor becomes the 4th gated row with the same stamp-pair (AGENT-COMPAT + PLATFORMS footer). No new stamp format or checklist artifact.

**Minimal refactor gate.** No refactor. Additive list/prose updates only. Deferred: VERSION-HISTORY entry (release-gated; lands at the cut that ships Cursor enrolment).

**DOGFOOD evidence (this Cursor session):**
- Step 1: Contract comprehension complete. flowtron version: `v5.16.0`. My row: Cursor `unverified` (pre-stamp).
- Step 2: Cue-render check complete. Full vocabulary emitted; glyphs + UPPERCASE labels legible; 👁️ **CONFIRM** bold renders.
- Step 3: Phase-1 drive on CORE-438.N (Proceed; skip ✅). `git status` at boundary: only host tasknote `CORE-438.5.md` — Step 3 wrote nothing.

**Deliverables:**
- `docs/PLATFORMS.md` — Cursor stub → 9-row trigger table + first-use footer; Non-Claude intro names Cursor among observed agents
- `docs/AGENT-COMPAT.md` — Cursor stamp `v5.16.0 · 2026-08-12 (dogfooded)`; obligation + Pre-adoption + still-unverified prose updated for 4 gated rows
- `docs/DOGFOOD.md` — Recording-the-result stamp locations: Cursor joins Grok/Codex footer pair
- `claude/skills/ft-release/SKILL.md` — §5 enumerate/apply + Acceptance + §7.4 summary example include Cursor

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: docs/skill markdown only; no UI surface

**Testing Notes:**

| Check | Result |
|---|---|
| AGENT-COMPAT Cursor stamp | `v5.16.0 · 2026-08-12 (dogfooded)` |
| PLATFORMS Cursor footer | same stamp (lockstep) |
| Stub phrase `trigger table pending` | cleared from live docs |
| Enrolment lists (AGENT-COMPAT / ft-release §5 / §7.4 / DOGFOOD) | all name Cursor as 4th gated row |
| Remaining `unverified` PLATFORMS footers | Gemini / Aider / Amp only (correct) |
| Markdown / code lint | N/A — pure markdown edits; no typed surface |

Quality: no avoidable duplication (install path points at snippet/worked example); no Cursor-specific contract terms; gate mechanism unchanged beyond enumeration.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Dogfooded flowtron under Cursor at `v5.16.0`, replaced the PLATFORMS Cursor stub with a first-use trigger table, stamped AGENT-COMPAT + PLATFORMS `dogfooded`, and enrolled Cursor as the 4th per-release dogfood-gate row.

| Path | Verdict |
|---|---|
| `docs/PLATFORMS.md` | **updated** — Cursor trigger table + stamp; Non-Claude intro |
| `docs/AGENT-COMPAT.md` | **updated** — Cursor dogfooded + 4-row gate prose |
| `docs/DOGFOOD.md` | **updated** — Cursor stamp-location pair (not AI-referenced; deliverable) |
| `claude/skills/ft-release/SKILL.md` | **updated** — §5/§7 Cursor enrolment (on-demand skill; deliverable) |
| Remaining AI-referenced docs | **no change** |

Maintainability: next `/ft-release` cut must resolve Cursor alongside Claude/Grok/Codex; Cursor operators get a real trigger table instead of a pending stub.

**Archived:** 2026-08-12
