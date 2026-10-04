---
title: model-selection-user-reduction
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-198.2]
---

# CORE-199 | model-selection-user-reduction

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-198.2]]

## 🎯 Goal

Reduce `~/.claude/CLAUDE.md` §Model Selection from 3 bullets to one general-scope sentence, dropping the copy-paste line guidance (already owned by flowtron `SPEC/model.md` + §Post-closure protocol).

## ✅ Acceptance

- [ ] `~/.claude/CLAUDE.md` §Model Selection collapses from 3 bullets to 1 bullet carrying the consolidated sentence: `Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind.`
- [ ] §Model Selection heading preserved (anchor + style parity with neighboring sections)
- [ ] Copy-paste line guidance (old bullet 3 about `/model sonnet` then `/task X`) dropped — that mechanic is owned by flowtron `SPEC/model.md` final paragraph + SPEC §Post-closure protocol step 3
- [ ] Doc-drift sweep recorded for all 9 entries in `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Edit `~/.claude/CLAUDE.md` lines 44-46 — replace the 3 bullets with 1 bullet carrying the consolidated sentence
- [ ] Phase 4 closure: doc-drift sweep + PLAN.md flip + archive

## 🔗 Related

- [[CORE-198.2]] — surfaced this finding (delete-as-duplicate cross-contract, Finding #4 in the 2026-05-25 audit)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The audit ([[CORE-198.2]] Finding #4) pre-locked the exact replacement sentence and locked the rationale (cross-contract semantic dup — `SPEC/model.md` + §Post-closure protocol already own the model-naming-on-next-step copy-paste mechanic). [[CORE-198.3]] explicitly punted §Model Selection to this task ("unchanged (CORE-199 is the user-machine reduction follow-up)"). The PLAN.md line carries the verbatim sentence. No re-scope warranted.

- [x] Read relevant source files:
  - `~/.claude/CLAUDE.md` (target file) — §Model Selection at lines 43-46 carries the 3 bullets verbatim; section is preceded by §Communication, followed by §Tech Stack Tendencies (new section lifted by `.3`).
  - flowtron `SPEC/model.md` — final paragraph (lines 32-35) carries the canonical model-on-next-task-suggestion + Opus/Sonnet defaults: "Default to `opus` for design, multi-file changes, or ambiguity; reserve `sonnet` for mechanical work with a clear diff in mind." (matches the audit's proposed user-side sentence almost word-for-word, intentionally.)
  - flowtron `SPEC.md` §"Post-closure protocol" step 3 — carries the `/clear then /model <opus|sonnet> then /<next-skill> <args>` copy-paste line + the "matches the next task's PLAN-line `[model]`, pre-empting the Step 1.5 gate on assistant hand-offs" rationale. The user-side bullet 3 about `/model sonnet` then `/task X` literally restates this mechanic.
  - `_project/tasknote/archive/core/CORE-198.2.md` — the audit producing this finding; classifies §Model Selection as `delete-as-duplicate` cross-contract (with reduction); recommends keeping the user-side as a general-scope sentence usable outside flowtron contexts.

- [x] **Archive skim** — `grep -l "Model Selection|model-selection" _project/tasknote/archive/core/*.md` hit 5 archives: CORE-198.2 (the audit; primary input — read), CORE-198.3 (consolidation; punted §Model Selection here — confirmed), CORE-198.5 (epic-close audit; reviewed `.3` work without touching `.2`'s leftover), CORE-097.4 and CORE-097.7 (external-skill-survey; orthogonal — surveyed AntropicQuickstart/superpowers skill libraries; no `~/.claude/CLAUDE.md` content touched). No prior tasknote has edited §Model Selection itself; CORE-199 is the first.

- [x] **Drift check** — verified at HEAD:
  - `~/.claude/CLAUDE.md` §Model Selection still at lines 43-46 (3 bullets matching the audit's snapshot) ✓
  - flowtron `SPEC/model.md` final paragraph still carries the next-task-model-naming convention ✓
  - flowtron `SPEC.md` §"Post-closure protocol" step 3 still carries the copy-paste line + `/model` segment rationale ✓
  - The replacement sentence in the PLAN.md line matches `SPEC/model.md`'s "Default to `opus` for design, multi-file changes, or ambiguity; reserve `sonnet` for mechanical work with a clear diff in mind." in intent (user-side reframes for general AI-coding contexts; flowtron-side stays inside the PLAN.md `[model]` grammar) — no contradiction.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** The audit pre-locked the exact wording; the PLAN.md line quotes it verbatim. Assumptions:
  - **A1.** Use the verbatim sentence from the PLAN.md/audit line: `Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind.` Terminal period to match neighboring bullets' punctuation.
  - **A2.** Keep the §Model Selection heading (preserves an anchor + matches the heading-+-bullets shape of every other section in the file).
  - **A3.** Replace all 3 bullets with 1 bullet — no auxiliary bullet for "when uncertain, default to Opus" (that nuance is already implicit in "Default to Opus for ... ambiguity" and the dropped copy-paste guidance was the explicit "name the model on next-step" rule, which `SPEC/model.md` owns).
  - **A4.** No "User-machine edit:" parenthetical in the replacement bullet — the audit ticket-draft initially included that phrase but Phase 3 word-counting trimmed it to land at 50w; the body text doesn't need it either.

- [x] Subtasks above populated with concrete, ordered steps (see ✅ Acceptance and 🧩 Subtasks above).

**Discovery Notes:**

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced no significant scope deviation — the audit pre-locked the wording, the PLAN.md line quotes it verbatim, and no drift was found. → **Skip 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — neighboring sections in `~/.claude/CLAUDE.md` (§Scope & Safety, §Core Principles, §Surgical & Safe Changes, §Shell discipline, §Execution & Verification, §Communication, §Tech Stack Tendencies) all use the `### Heading` + hyphen-bullet shape; preserving the heading + collapsing to 1 bullet matches that pattern exactly. No new shape introduced.
- [x] Implemented the minimal solution — single Edit to `~/.claude/CLAUDE.md` lines 43-46: replaced the 3 existing bullets with 1 bullet carrying the audit-locked sentence.
- [x] Updated/added tests for non-trivial behavior — N/A (markdown personal-config edit; no executable surface).

**Implementation Notes:**

Before (3 bullets, lines 43-46):

```markdown
### Model Selection
- Default to **Opus** for anything involving design, multi-file changes, debugging, ambiguity, or reasoning across systems. Most coding tasks default here.
- Suggest **Sonnet** only when the work is mechanical and you have high confidence in the diff before starting: renames, single-file edits with a clear plan, doc/formatting tweaks, scaffolding from a known template, running a known recipe.
- When recommending a next step (new task, workflow phase, follow-up), name the model explicitly (e.g. `/model sonnet` then `/task X`). A silent downgrade that fails costs more than the tokens saved — when uncertain, default to Opus and say so.
```

After (1 bullet, lines 43-44):

```markdown
### Model Selection
- Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind.
```

Reductions:
- **Bullet 1** ("Default to Opus...") condensed from a sentence-cluster into "design/multi-file/ambiguity" — preserves the three load-bearing dimensions (debugging/reasoning-across-systems fold into ambiguity).
- **Bullet 2** ("Suggest Sonnet only when mechanical...") condensed to "mechanical work with a clear diff in mind" — the rename/single-file/doc-formatting/scaffolding/recipe examples were illustrative; the principle is the diff-in-mind criterion.
- **Bullet 3** ("When recommending a next step, name the model explicitly...") dropped entirely — flowtron `SPEC/model.md` last paragraph + SPEC §Post-closure protocol step 3 own this copy-paste mechanic (`/clear then /model <opus|sonnet> then /<next-skill> <args>`). User-side restatement was the cross-contract duplication.

Bolding (`**Opus**` / `**Sonnet**`) dropped to match the lighter tone of the single sentence — neighboring sections use bold sparingly for emphasis terms, not for routine model names.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown user-config edit; no executable surface).
- [x] Ran lint/type-check on changed code — N/A; markdown only.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched).

**Testing Notes:**

Verification gates (substituting for automated tests):

1. **Post-edit read** — `~/.claude/CLAUDE.md` lines 41-47 read as expected: §Communication closing bullet (L41) · blank (L42) · `### Model Selection` heading (L43) · 1 bullet (L44) · blank (L45) · `### Tech Stack Tendencies` heading (L46). ✓
2. **Section integrity** — neighboring sections (§Communication above, §Tech Stack Tendencies below) unchanged; no orphan whitespace introduced. ✓
3. **Cross-contract owners intact** — `SPEC/model.md` final paragraph and SPEC §Post-closure protocol step 3 unchanged at HEAD (the contract owners that justify dropping user-side bullet 3 still own that mechanic). ✓
4. **PLAN.md ticket-acceptance check** — the PLAN.md long description's example sentence (`Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind`) matches the written line verbatim. ✓

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip — diff is markdown-only; signals clear)

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

The edit lives in `~/.claude/CLAUDE.md` (outside the flowtron repo, user-machine personal config); no flowtron contract surface references §Model Selection content. Cross-contract owners (`SPEC/model.md` + SPEC §Post-closure protocol step 3) remain untouched — they're the canonical layer the user-side reduction defers to.

**Final Summary:**

Reduced `~/.claude/CLAUDE.md` §Model Selection from 3 bullets to 1, dropping the copy-paste line guidance now that flowtron `SPEC/model.md` + SPEC §Post-closure protocol own that mechanic canonically. Resolves the only strong cross-contract semantic duplication surfaced by CORE-198.2's audit (Finding #4, delete-as-duplicate).

Technical detail:
- **Edit:** `~/.claude/CLAUDE.md` lines 43-46 → lines 43-44 (3 bullets to 1; ~98 words to 17 words in §Model Selection body). Heading preserved; bold-prefix dropped from Opus/Sonnet for lighter tone matching neighboring single-bullet sections.
- **Replacement sentence:** verbatim from CORE-198.2's locked recommendation — `Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind.`
- **Contract layer untouched:** `SPEC/model.md` final paragraph still carries the next-task-model-naming + Opus/Sonnet defaults (the canonical owner inside the PLAN.md `[model]` grammar); SPEC §Post-closure protocol step 3 still carries the `/clear then /model <opus|sonnet> then /<next-skill> <args>` copy-paste line + `[model]`-segment rationale (the canonical owner of the next-step copy-paste mechanic the dropped user-side bullet 3 was duplicating).
- **Archive-skim:** confirmed CORE-199 is the first tasknote to touch §Model Selection (CORE-198.2 surfaced the finding; CORE-198.3 explicitly punted to this task; CORE-198.5 closed the epic without re-touching).
- **Pattern survey:** matched the heading-+-bullets shape used by every other section in the file (no new shape).
- **Signal trips for §"Conditional skip rule":** all three clear — zero frontend files touched (the user-config markdown isn't under a UI dir), zero privileged-ops paths touched (no migrations/auth/security/integrations), no perf-narrative concern (pure markdown prose edit). → Skip branch (autonomous-commit motion).

**Archived:** 2026-05-25
