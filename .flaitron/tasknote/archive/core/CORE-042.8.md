---
title: audit
status: completed
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-EPIC-042, CORE-042.1, CORE-042.2, CORE-042.3, CORE-042.4, CORE-042.5, CORE-042.6, CORE-042.7, CORE-042.9]
---

# CORE-042.8 | audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-042]] [[CORE-042.1]] [[CORE-042.2]] [[CORE-042.3]] [[CORE-042.4]] [[CORE-042.5]] [[CORE-042.6]] [[CORE-042.7]] [[CORE-042.9]]

## 🎯 Goal

Verify the CORE-EPIC-042 architecture rethink lands cleanly: per-`/task` load actually shrunk vs the ~12,300w baseline, adopters can still adopt with the new SPEC layout, and contracts remain discoverable from the always-loaded surface.

## ✅ Acceptance

- [ ] Per-`/task` always-loaded surface measured against the ~12,300w pre-epic baseline; both **absolute** (current PLAN.md) and **structural** (PLAN-frozen) lenses reported in Final Summary
- [ ] Adopter onboarding surfaces (`README.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`, `templates/tasknote-README.md`) verified consistent with the post-epic frontmatter (6-field) + `SPEC/` lazy-modules layout
- [ ] All five SPEC.md → SPEC/ pointer stubs cite a real module file; no dangling §"Foo" cross-refs in slim core or modules
- [ ] All audit findings classified: trivial drift fixed inline OR filed as `.9+` follow-ups per user's preferred shape
- [ ] Final Summary records findings even when nothing's wrong (per `SPEC/epic.md` Audit lifecycle)

## 🧩 Subtasks

- [ ] (resolved by clarifying question) Confirm audit-deliverable shape — fix-inline vs file-`.9+`
- [ ] Apply chosen shape to the two surfaced drift findings (Step 0.5 typo + stale Model-field snippet line)
- [ ] Compose Final Summary with absolute + structural load measurements and adopter-surface verification

## 🔗 Related

- [[CORE-EPIC-042]] — parent epic (workflow architecture rethink)
- [[CORE-042.1]] — Discovery (settled open questions, filed children)
- [[CORE-042.2]] — Thrust A: SPEC modularization (lazy modules)
- [[CORE-042.3]] — Thrust C part 1: frontmatter audit (priority/area drop)
- [[CORE-042.4]] — Thrust C close: status source-of-truth
- [[CORE-042.5]] — Thrust B ship: micro-tasknote
- [[CORE-042.6]] — Thrust B propose-half: phase rethink Discovery
- [[CORE-042.7]] — Shape A: 4-phase dedup (predecessor / immediate)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Final child of [[CORE-EPIC-042]]. All implementation children .2-.7 closed today; per `SPEC/epic.md` lifecycle, Audit verifies the completed work and records findings even when nothing's wrong. PLAN.md line still unchecked under `## Medium`.

- [x] Read relevant source files — `SPEC.md` (2,954w slim core), `SPEC/{epic,starter,blocked,model,versioning}.md` (1,499w lazy modules), `.claude/skills/task/SKILL.md` (2,409w), `docs/MIGRATION.md`, `README.md`, `claude/CLAUDE-snippet.md`, `templates/tasknote-README.md`, `templates/tasknote-template.md`, `_project/PLAN.md` (5,851w), CORE-042.1.md + CORE-042.2.md archives in full.
- [x] **Archive skim** — read [[CORE-042.1]] (epic Discovery; §A1 baseline + §A4 prediction) and [[CORE-042.2]] (Thrust A closure; §A4 prediction landed at ~10.2% not ~17%, with SKILL-side ~600w deferred). Sized .3/.4/.5/.6/.7 closure summaries via PLAN.md (sufficient — each closure has its own delta record).
- [x] **Drift check** — see Drift findings sub-section in Discovery Notes; two surfaced.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 2 questions resolved via AskUserQuestion: (1) **fix the two trivial drifts inline** (filing-overhead would outweigh the saving); (2) **file SKILL lazy-load as CORE-042.9** (extend the architecture push rather than calling it done).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Per-`/task` always-loaded load (post-epic)

Current word counts on the always-loaded surface:

| Surface | Words |
|---|---|
| `SPEC.md` (slim core) | 2,954 |
| `.claude/skills/task/SKILL.md` | 2,409 |
| `_project/PLAN.md` | 5,851 |
| `~/code/CLAUDE.md` (workspace) | 209 |
| `~/.claude/CLAUDE.md` (global) | 465 |
| **Total (incl CLAUDE.md)** | **11,888** |

Lazy modules (loaded only on branch fire):

| Module | Words | Trigger |
|---|---|---|
| `SPEC/blocked.md` | 494 | `status: blocked` (Step 3c) or mid-Phase-2 parking (Step 5) |
| `SPEC/starter.md` | 334 | `status: starter` (Step 3a) |
| `SPEC/epic.md` | 303 | `<AREA>-EPIC-<N>` or `<AREA>-<N>.<sub>` (Step 2) |
| `SPEC/model.md` | 223 | Model mismatch / legacy entry (Step 1.5) |
| `SPEC/versioning.md` | 145 | Version-bump tasks only |

`templates/tasknote-template.md` (325w) is loaded only on scaffold (Step 3a/3b).

### B. Load measurement vs ~12,300w baseline

**Two lenses:**

**Absolute** — current state vs pre-epic baseline cited in PLAN.md line:
- Pre-epic baseline (CORE-042.1 §A1, incl CLAUDE.md): ~12,376w
- Post-epic actual (incl CLAUDE.md): **11,888w**
- **Saving: −488w / −3.9%** on the always-loaded surface (fresh-task branch)

**Structural** — PLAN-frozen at pre-epic 5,369w (isolates the architectural intervention from PLAN.md growth via 7 closure summaries):
- Pre-epic: SPEC 4,014 + SKILL 2,319 + PLAN 5,369 + CLAUDE 674 = 12,376w
- Post-epic, PLAN-frozen: SPEC 2,954 + SKILL 2,409 + PLAN 5,369 + CLAUDE 674 = 11,406w
- **Saving: −970w / −7.8%** structural (fresh-task branch)

**Per-branch saving** (post-epic actual minus the lazy module that fires):

| Branch | Lazy load | Effective total | Saving vs pre-epic 12,376 |
|---|---|---|---|
| Fresh task (Step 3b, plain ID) | none | 11,888 | −488w / −3.9% |
| Epic subtask (Step 2) | epic.md (303) | 12,191 | −185w / −1.5% |
| Starter promotion (Step 3a) | starter.md (334) | 12,222 | −154w / −1.2% |
| Blocked resume (Step 3c) | blocked.md (494) | 12,382 | +6w / +0.05% |
| Model-gate edge case (Step 1.5) | model.md (223) | 12,111 | −265w / −2.1% |

### C. Why the shrink is smaller than CORE-042.1 §A4 predicted (~17%)

Two effects compound:

1. **PLAN.md grew +482w during the epic** — closure summaries for .1 through .7 each added 50-100w to the active line (since the line moves to `## Completed` on closure, but the bulk of the addition is in the long description). This is structural-write-once (each closure is permanent). Net: 5,369 → 5,851w.
2. **SKILL-side lazy-loading deferred** — CORE-042.1 §A4 assumed Step 3a (414w) + Step 3c (184w) + part of Step 1.5 (150w of 231w) would lazy-load too. CORE-042.2 closure flagged this as out-of-scope; the SKILL gained +90w of dispatch directives instead of shrinking. ~600-750w of additional structural saving remains on the table if a future task lazy-loads SKILL bodies.

So the current ~7.8% structural / ~3.9% absolute is the SPEC-side win alone. Adding SKILL-side lazy-loading (a hypothetical future task) would lift structural to ~13-14%.

### D. Adopter onboarding verification

| Surface | Status | Notes |
|---|---|---|
| `README.md` | OK | Lists `SPEC.md` as contract; doesn't mention `SPEC/` modules but they're discoverable via SPEC.md pointer stubs. Acceptable. |
| `docs/MIGRATION.md` §1.5 frontmatter list | OK | Lists 6 fields (`title`, `status`, `tags`, `created`, `due`, `related-tasks`) — matches post-CORE-042.3 frontmatter |
| `docs/MIGRATION.md` §1.3 → CLAUDE-snippet | OK | Adopters paste the snippet which references `_project/flowtron/SPEC/versioning.md` — module discoverability lands |
| `claude/CLAUDE-snippet.md` L18 | **DRIFT** | "Each tasknote header carries a `Model` field" — stale per [[CORE-023]] (model retired from frontmatter, lives on PLAN.md task line). Adopter-facing. Pre-existing CORE-023 cleanup gap surfaced by this audit's adopter-surface check. |
| `claude/CLAUDE-snippet.md` L19 | OK | Cites `_project/flowtron/SPEC/versioning.md` correctly |
| `templates/tasknote-README.md` L17 | OK | Frontmatter list correct; cites `_project/flowtron/SPEC/model.md` |
| `templates/tasknote-README.md` L18-L20 | OK | Cites `SPEC/starter.md` and `SPEC/epic.md` correctly |

### E. Always-loaded contract discoverability

Slim `SPEC.md` retains 5 H2 headings as pointer stubs (`Epic lifecycle`, `Starter tasknotes`, `Blocked tasks`, `Model field`, `Versioning`), each with one-line `Canonical contract: see [SPEC/<name>.md].` The reader sees the section names and where to go; trigger info ("loaded when X") lives in each module's header note, not in slim core. **Verdict: discoverable but minimal.** Could enrich with one-line trigger summary per stub, but trade-off is ~25-50w more on the always-loaded surface — explicitly traded away during CORE-042.2. Confirmed acceptable.

Cross-ref check across slim SPEC.md + 5 modules: every `§"Foo"` reference resolves to a real heading (either in slim core or in a pointer-stub section that itself points to a module). No dangling refs.

### F. Drift findings (two)

1. **`SPEC/model.md:9`** — references "see `claude/skills/task/SKILL.md` Step 0.5" but the model gate is at **Step 1.5** in SKILL.md. Typo, likely introduced during CORE-042.2 modularization. Load-bearing because model.md is loaded on the model-mismatch / legacy-entry branch and an AI driving the gate would look for "Step 0.5" and not find it.
2. **`claude/CLAUDE-snippet.md:18`** — "Each tasknote header carries a `Model` field (`opus` / `sonnet`)" is stale per [[CORE-023]] (frontmatter `model:` field retired in v0.2.0; PLAN.md task line carries `[model]` instead). Adopter-facing — the snippet is what adopters paste into their `CLAUDE.md`. Pre-existing CORE-023 cleanup gap; surfaced by this audit's axis B check.

Both are 1-line fixes. Audit-shape question pending (file as `.9+` per PLAN.md instruction, or fix inline since they're trivial?).

### G. SKILL-side lazy-load opportunity (out of audit scope; potential `.9+` filing)

Per CORE-042.2 closure §"Out-of-epic surface noted but not filed": Step 3a (414w) + Step 3c (184w) + Step 1.5 mismatch/legacy bodies (~150w) could lazy-load via the same directive-Read pattern, lifting structural saving from ~7.8% to ~13-14%. Filing as a follow-up depends on whether we want to push the architecture further or call CORE-EPIC-042 done at SPEC-side.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed [[CORE-038]] / [[CORE-039]] precedent for prose-only edits (Edit tool, no test surface), and [[CORE-042.1]] / [[CORE-037]] precedent for audit Final Summary shape (per-axis findings + filed follow-ups). Filing CORE-042.9 mirrors CORE-042.1's child-filing pattern — single PLAN.md line under the same `## Medium` heading, ≤50w long description.
- [x] Implemented the minimal solution — three edits + one filing.
- [x] Updated/added tests for non-trivial behavior — n/a (markdown edits + PLAN.md filing only).

**Implementation Notes:**

Three edits landed:

1. **`SPEC/model.md:9`** — `Step 0.5` → `Step 1.5`. One-character fix; resolves the load-bearing reference for the model-gate edge-case branch.
2. **`claude/CLAUDE-snippet.md:18`** — replaced "Each tasknote header carries a `Model` field" with "Each PLAN.md task line carries a `[model]` segment" (rest of line preserved). Aligns adopter-facing snippet with the [[CORE-023]] post-state.
3. **`_project/PLAN.md:31`** — filed `CORE-042.9` as a new child of CORE-EPIC-042 directly below CORE-042.8. Long description = 46w (within 50w target).

No SPEC version bump — both fixes are clarifications/corrections of existing intent, not contract changes (matches [[CORE-040]] precedent of patch-no-bump for clarifications).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `cd viz && npm test` → **54/54 pass** (parser.test.ts 29 + tasknote.test.ts 25). Confirms the new PLAN.md line for CORE-042.9 parses cleanly under the existing grammar (no special handling needed).
- [x] Ran lint/type-check on changed code — n/a (markdown edits only; no TS/JS changes).
- [x] (frontend) Asked the user for visual confirmation — n/a (no UI change).

**Testing Notes:** Sanity-grep across the three edits confirmed each landed at the intended line. No SPEC `§"Foo"` cite drift introduced.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — `SPEC/model.md`, `claude/CLAUDE-snippet.md`, `_project/PLAN.md`.
- [x] Closed — PLAN.md status flipped to `Completed 2026-05-07` and tasknote moved to `_project/tasknote/archive/core/`.
- [x] Recapped changes with the user and got confirmation.

**Final Summary:**

CORE-042.8 was the **Audit** child closing [[CORE-EPIC-042]] (workflow architecture rethink). Per `SPEC/epic.md` Audit lifecycle: verified the completed work sits well in the codebase as a whole, and recorded findings.

**Per-`/task` load — answered:**

| Lens | Pre-epic | Post-epic | Δ |
|---|---|---|---|
| **Absolute** (with PLAN.md growth from 7 closure summaries) | ~12,376w | **11,888w** | **−488w / −3.9%** |
| **Structural** (PLAN-frozen at 5,369w to isolate the architectural intervention) | 12,376w | 11,406w | **−970w / −7.8%** |

Below the [[CORE-042.1]] §A4 prediction of ~17%. Two reasons compound: (1) PLAN.md grew +482w during the epic via closure summaries; (2) SKILL-side lazy-loading deferred — Step 3a/3c/Step 1.5 bodies (~600-750w) remain inline. CORE-042.9 (filed) carries the architecture-push half if pursued.

**Adopters can adopt cleanly — verified:** `README.md` / `docs/MIGRATION.md` §1.5 / `templates/tasknote-README.md` / post-fix `claude/CLAUDE-snippet.md` all consistent with the post-epic 6-field frontmatter and `SPEC/` lazy-modules layout.

**Contracts discoverable from always-loaded surface — verified:** Slim `SPEC.md` retains all 5 H2 headings as pointer stubs (`Epic lifecycle` / `Starter tasknotes` / `Blocked tasks` / `Model field` / `Versioning`), each pointing at its module. Trigger info ("loaded when X") lives in module headers, not in slim core — minimal but adequate. No dangling `§"Foo"` cross-refs across slim core + 5 modules.

**Drift findings (2, both fixed inline per user direction):**

1. `SPEC/model.md:9` — `Step 0.5` → `Step 1.5`. Load-bearing for the model-gate edge-case branch.
2. `claude/CLAUDE-snippet.md:18` — stale "tasknote header carries a `Model` field" → "PLAN.md task line carries a `[model]` segment". Adopter-facing; pre-existing [[CORE-023]] cleanup gap surfaced by this audit.

**Follow-up filed: [[CORE-042.9]]** — SKILL-side lazy-load (Step 3a / 3c / Step 1.5 edge cases). Lifts structural saving from ~7.8% to ~13-14% if pursued. Design call (mixes SPEC vs interpretation) preserved on the line for future Discovery to settle.

**Method note:** The audit's two-lens load measurement (absolute vs structural) turned out to matter — reporting only the absolute figure (−3.9%) understates the architectural intervention; reporting only the structural (−7.8%) overstates the user-perceived per-`/task` load (PLAN.md growth is real even if it's a separate concern). Both lenses keep the next iteration honest.

**Epic status:** [[CORE-EPIC-042]] parent line stays `[ ]` until [[CORE-042.9]] closes. Per `SPEC/epic.md` audit follow-up rule (few small follow-ups → execute as normal children, no fresh Audit subtask), one filing here doesn't warrant a second-wave audit.

**Archived:** 2026-05-07
