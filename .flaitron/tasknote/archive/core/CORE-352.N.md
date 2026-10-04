---
title: spec-agent-validation audit
status: completed
tags: []
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-352, CORE-352.1, CORE-352.2, CORE-352.3, CORE-352.4, CORE-352.5]
---

# CORE-352.N | spec-agent-validation audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-352]]

## 🎯 Goal

Verify the completed `CORE-EPIC-352` (`spec-agent-validation`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-352.N — audit CORE-EPIC-352` commit lands (chore: no code edits — verification-only audit)
- [x] PLAN.md line for `CORE-352.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-352.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-352` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-352.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic (spec-agent-validation); this is its terminal `.N` audit child
- [[CORE-352.1]] — Discovery (locked scope) · [[CORE-352.2]] — `/ft-spec` skill · [[CORE-352.3]] — wiring · [[CORE-352.4]] — external-agents + validation docs · [[CORE-352.5]] — dogfood

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-352` active under `## High`; children `.1`–`.5` all `[x]`; `.N` audit the only open child.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-352.N`; skill pre-flight passed (parent active, `.N` is the terminal audit child, all five implementation children closed — no open siblings). Deliverable = cumulative coherence verification + parent-flip prompt.

- [x] Read relevant source files — all five cohort archives (`CORE-352.1`–`.5`), `SPEC/epic.md` (lifecycle + fixed doc-drift line), `.flowtron/tasknote/README.md` §"AI-referenced docs".

- [x] **Archive skim** — self-referential for an epic audit; the five cohort children are themselves the archive entries under review. No non-cohort surfaces with prior tasknote history beyond the cohort.

- [x] **Drift check** — every deliverable path cited across the cohort verified present at HEAD (see Implementation Notes verification sweep); counts consistent at 26; no stale "nine"/"twenty-four"/"25" references.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** All five children closed; cohort scope is the full `.1`–`.5` set (no early-audit / partial cohort). Explicit assumption: audit is a verification pass, not a code-fix task.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory (deliverables per child)

| Child | Shortname | Deliverables |
|---|---|---|
| `.1` | discovery | Filed `.2`–`.5` child scopes in PLAN.md; locked archetype (planning peer), six-section spec order, review-first + `--fast`, auto-wire into adopter subset, hooks/new-phase out. Pure filing. |
| `.2` | ft-spec-skill | 4 new files: `templates/spec-template.md` (6 locked sections), `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`. Review-first optional planning peer; writes only to `.flowtron/specs/<slug>.md`. |
| `.3` | ft-spec-wiring | Fanned `/ft-spec` across 9 wiring surfaces + README + PLATFORMS worked-example: symlink block 24→26, rosters, MIGRATION §1.2/§1.6/§1.7/smoke counts, `ft-new-project` Steps 3/7/8, `ft-flowtron` table, `SPEC.md` §"Skill namespace", `SPEC/tasknote-selection.md` bullet pair. |
| `.4` | external-and-validation | `docs/EXTERNAL-AGENTS.md` (net-new, one-agent-per-tasknote, not-an-orchestrator boundary) + reciprocal WORKTREES backlink; soft PBT guidance into `tasknote-template.md` §Phase 3 + `SPEC.md` §Phase 3; README index. |
| `.5` | ft-spec-dogfood | Ran `/ft-spec` on "spec→work handoff"; produced `.flowtron/specs/spec-to-work-handoff.md`; one warranted skill fix (Step-4 slug ties filename↔frontmatter); 3 below-bar observations; no follow-ups warranted. |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass over existing cohort deliverables, no new code surface. No inline fix needed (see findings).

- [x] Implemented the minimal solution — cumulative coherence verification (Acceptance criteria 2–4); findings recorded below. No code edits.

- [x] Updated/added tests for non-trivial behavior — N/A (no code fix applied).

**Implementation Notes:**

### Cumulative verification sweep (HEAD, 2026-07-12)

- **Deliverable existence** — all 6 new files present: `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`, `templates/spec-template.md`, `docs/EXTERNAL-AGENTS.md`, `.flowtron/specs/spec-to-work-handoff.md`.
- **Inventory counts consistent at 26** — `claude/skills` (26), `claude/commands` (26), `codex/skills` (26), `claude/AGENTS-snippet.md` symlink block (26 `ln -s`), `ft-new-project` verify (26 `readlink`). Stale-reference sweep for `nine tasknote` / `twenty-four symlink` / `25 \`SKILL.md\`` clean outside archive.
- **`/ft-spec` present across all wiring surfaces** — `claude`/`codex` AGENTS-snippets, root `AGENTS.md`, `docs/MIGRATION.md`, `SPEC.md`, `ft-flowtron`, `SPEC/tasknote-selection.md`, `docs/PLATFORMS.md`.

### Cohort coherence findings

- **Naming consistency** — `ft-spec` slug uniform across skill / command / codex wrapper / rosters / snippets. The six-section spec order (Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach) is identical across `templates/spec-template.md`, the `.2` skill body, and the `.5` dogfood-produced spec. No divergence.
- **Style parity** — `docs/EXTERNAL-AGENTS.md` follows the `WORKTREES.md` locked-conventions prose shape (intro → rule → contract → boundary → `**Related:**` footer); wiring `.3` reused the `CORE-330.5` fan-out shape verbatim. Consistent with established precedent.
- **No contradictory cross-refs** — EXTERNAL-AGENTS ↔ WORKTREES reciprocal links resolve both directions; README indexes EXTERNAL-AGENTS in §Documents + repo-layout; validation-guidance language is verbatim-aligned between `SPEC.md:443` and `tasknote-template.md:76`, both echoing the spec-template Validation Approach. Dogfood artifact's `slug` matches its filename (validates the `.5` fix).
- **No regressions** — earlier-shipped children's surfaces (`.2` skill, `.3` wiring counts) remain internally consistent after `.4`/`.5` landed; no count or roster surface reverted.

### Below-bar observation (no follow-up warranted)

- Archived tasknotes `.2`/`.4`/`.5` retain `status: in-progress` frontmatter + "🟢 In progress" nav header, while `.1`/`.3` show `completed`/`✅ Completed`. **Not a genuine drift**: `status: in-progress` in archived tasknotes is the dominant repo convention (dozens of archived notes retain it, including the most recent epic audit `CORE-351.N`); the Phase 4 closure checklist is silent on flipping frontmatter status, and CORE-350's archive-metadata cleanup established no flip rule. Below the bar — logged, not filed.

### Misses → `/ft-file-followup` candidates

- **None.** The cohort is coherent; no drift or regression exceeds this audit's inline-fix threshold, and no scope-exceeding miss surfaced. No follow-ups to file.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (verification-only audit; no code changed).

- [x] Ran lint/type-check on changed code — N/A (no code edits; markdown-prose audit tasknote only).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Test suite / lint / frontend all N/A — this audit applied no inline fix, so there is no changed code surface to test. Verification was the deterministic existence + count + cross-link sweep captured in Implementation Notes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" (cumulative state at HEAD after the full cohort landed):

  - `README.md` — **current** (updated by `.3` §"Bootstrapping" nine→ten + `.4` EXTERNAL-AGENTS index); no residual staleness.
  - `SPEC.md` — **current** (`.3` §"Skill namespace" +`/ft-spec`; `.4` §Phase 3 validation guidance); no further change.
  - `docs/MIGRATION.md` — **current** (`.3` §1.2/§1.6/§1.7/smoke counts to ten/eleven + 26 staging paths); no further change.
  - `claude/AGENTS-snippet.md` — **current** (`.3` symlink block 24→26 + §Workflow roster); no further change.
  - `codex/AGENTS-snippet.md` — **current** (`.3` alphabetical `ft-spec` line); no further change.
  - `docs/CONVENTIONS.md` — no change (no skill roster/count surface).
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change (`/ft-spec` review-first, writes only to `.flowtron/specs/`; external-agent handoff stays inside the review-gated flow — no new attack surface).
  - `docs/AGENT-NEUTRALITY.md` — no change (cohort is agent-neutral: Claude skill + thin Codex wrapper + neutral templates/docs; no new Claude-specific contract-layer surface to ledger).
  - `docs/PLATFORMS.md` — **current** (`.3` Installed-surface policy both rows + worked-example stub counts 25→26); no further change.
  - `claude/CAPABILITIES.md` — no change (capability-trigger reference, not a skill roster).
  - `docs/AGENT-COMPAT.md` — no change (no matrix/last-verified change from this cohort).

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate alongside the parent-flip prompt)

**Final Summary:**

Audited the `CORE-EPIC-352` (`spec-agent-validation`) cohort — no inconsistencies surfaced; the optional `/ft-spec` skill, its adopter wiring, the EXTERNAL-AGENTS + soft-validation docs, and the dogfood all sit coherently in the codebase. Technical: verified all 6 new deliverables present at HEAD; inventory counts uniform at 26 (skills/commands/codex/symlink block/readlinks) with a clean stale-reference sweep; the six-section spec order is identical across spec-template, the skill body, and the dogfood-produced spec; EXTERNAL-AGENTS ↔ WORKTREES reciprocal links and README indexing resolve; Phase 3 validation guidance is verbatim-aligned between SPEC.md and the tasknote template. Fixed doc-drift sweep across all 12 AI-referenced ledger entries — five current (updated by the cohort), seven no-change. One below-bar cosmetic observation logged (archived-tasknote `status` frontmatter matches the dominant repo convention, not a drift). No misses warranted `/ft-file-followup`. Verification-only — no code edits, `chore:` commit.

**Archived:** 2026-07-12
