---
title: tasknote-README variant trim
status: completed
tags: []
created: 2026-05-08
due:
related-tasks: [CORE-047, CORE-049, CORE-050, CORE-051]
---

# CORE-052 | tasknote-README variant trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-047]] [[CORE-049]] [[CORE-050]] [[CORE-051]]

## 🎯 Goal

Trim `templates/tasknote-README.md` lines 25-28 (three variant paragraphs) to one-sentence pointers + canonical SPEC/template citations, removing the duplicated contract restatements while preserving the "what's here" surface.

## ✅ Acceptance

- [ ] ≥175w savings off `templates/tasknote-README.md` (verified by `wc -w` before/after; 702w → ≤527w)
- [ ] Each of the three variants (Standard / Starter / Micro) reduced to one-sentence cite-only form — no inline restatement of frontmatter shape, body shape, or lifecycle; line 28 (Epic lifecycle) preserved verbatim
- [ ] Every SPEC §X citation in the trimmed variant block resolves to an actual `^## ` / `^### ` heading in `SPEC.md`; every template path / SPEC module path resolves to an actual file
- [ ] Cold straight-through re-read of the trimmed file confirms adopter cold-start orientation still works end-to-end

## 🧩 Subtasks

- [ ] Draft the trimmed variant block per pure cite-only shape (one sentence per variant + canonical citations); line 28 preserved verbatim
- [ ] Replace lines 25-28 in `templates/tasknote-README.md` with the drafted block
- [ ] `wc -w` verify ≥175w savings (702w → ≤527w); flag mid-flight if short
- [ ] Citation grep-verify: each SPEC §X resolves; each template path / SPEC module path exists
- [ ] Cold straight-through re-read of trimmed file (full read, not skim); confirm orientation flow

## 🔗 Related

- [[CORE-047]] — doc-drift contract; added §"AI-referenced docs" to this template (precedent for additive template changes)
- [[CORE-049]] — workflow token audit; filed this starter
- [[CORE-050]] — sibling SKILL trim from same audit cohort (micro-task SKILL cite-don't-restate)
- [[CORE-051]] — sibling SKILL trim from same audit cohort (starter-task SKILL cite-don't-restate)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Sibling-of-[[CORE-051]] / [[CORE-050]] cite-don't-restate trim filed by [[CORE-049]] audit. Pattern proven on AI-loaded SKILL surfaces (CORE-050: -355w / -18.6%; CORE-051: -175w / -13.0%). This target is an **adopter-facing static doc**, not a SKILL — pattern transfers but audience differs (human cold-read vs AI execution). Realistic savings ~190w (~27%) verified live; ≥175w threshold gives ~15w slack.

- [x] Read relevant source files — `templates/tasknote-README.md` (702w; per-line word counts verified), SPEC.md headings inventoried for citation resolution, `templates/tasknote-{template,starter-template,micro-template}.md` exist (cite anchors), `SPEC/starter.md` exists (cite anchor).
- [x] **Archive skim** — `_project/tasknote/archive/core/` enumerated (44 prior tasknotes); narrowed via `grep -l "templates/tasknote-README"` (20 hits) and `grep -l "variant"` (2 direct hits: CORE-049, CORE-042.1). Read [[CORE-051]] (immediate sibling, just-merged): load-bearing — cite-don't-restate pattern + drift-correction precedent (verify baseline before locking threshold) + cold straight-through re-read mandate + citation grep-verify protocol. CORE-042.1 is the epic-discovery for the CORE-042 epic; passing reference only.
- [x] **Drift check** — file paths and line numbers match (lines 25-28 still hold the variant block). One drift: starter projected line 25 at ~70w; actual is **125w** (+55w from CORE-049's added model-assignment paragraph). Per-line: line 25 = 125w, line 26 = 56w, line 27 = 96w, line 28 = 40w. Variant block total = 317w (starter said ~290w). Realistic savings ~190w (top of starter's 150-200w range), not the lower end.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 3 questions resolved via AskUserQuestion: (1) **Acceptance threshold ≥175w** (conservative, ~15w slack against ~190w projection); (2) **Pure cite-only inline shape** (one sentence per variant + canonical citations; no inline keyword bullets; mirrors CORE-051); (3) **Skip MIGRATION.md note** (additive prose-only change; existing adopters' generated `_project/tasknote/README.md` won't auto-update and they ignore it).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Drift findings — savings projection raised

Starter's per-line baseline vs verified counts:

| Line | Variant | Starter claim | Actual | Trim target | Savings |
|---|---|---|---|---|---|
| 25 | Standard | ~70w | **125w** ⚠️ | ~30w | -95w |
| 26 | Starter | ~70w | 56w | ~25w | -31w |
| 27 | Micro | ~80w | 96w | ~30w | -66w |
| 28 | Epic | preserve | 40w | preserve | 0 |
| **Variant block** | | ~290w | **317w** | ~125w | **~-192w** |
| **Whole file** | | 702w | 702w ✓ | ~510w | **~-192w (~27%)** |

Line 25 grew +55w since starter was filed — CORE-049 added the model-assignment paragraph (which is canonical-home in `SPEC/model.md` + SPEC §"Task-line format", so it's a prime cite target). No semantic drift in the trim sites themselves.

### B. SPEC anchors targeted for citation (verified live)

| Variant | Citation | Status |
|---|---|---|
| Standard | SPEC §"Tasknote frontmatter" (line 142) | ✓ |
| Standard | SPEC §"Tasknote body shape" (line 168) | ✓ |
| Standard | `templates/tasknote-template.md` | ✓ |
| Starter | `SPEC/starter.md` | ✓ |
| Starter | `templates/tasknote-starter-template.md` | ✓ |
| Micro | SPEC §"When to use a tasknote (and when not to)" (line 334) | ✓ |
| Micro | `templates/tasknote-micro-template.md` | ✓ |

Final verification at Phase 3 (citation grep against `SPEC.md` headings + ls of cited paths).

### C. Decisions locked

| # | Decision | Source |
|---|---|---|
| 1 | Acceptance threshold ≥175w (~15w slack against ~190w projection); 702w → ≤527w | Phase 1 AskUserQuestion |
| 2 | Pure cite-only inline shape (no inline keyword bullets); mirrors CORE-051 | Phase 1 AskUserQuestion |
| 3 | Skip MIGRATION.md note (additive; adopters' generated README won't auto-update; they ignore) | Phase 1 AskUserQuestion |
| 4 | Line 28 (Epic lifecycle) preserved verbatim — already lean (40w) | Starter pre-lock |
| 5 | Phase 3 testing: N/A (adopter cold-start surface; no parser/test depends on this content); functional verification = citation grep-verify + cold straight-through re-read | Starter pre-lock |
| 6 | Version bump: patch (prose-only, no contract change) | Starter pre-lock; CORE-051 precedent |
| 7 | Pattern: cite-don't-restate (CORE-051 shape applied to adopter-facing doc surface; no lazy-fragment extraction) | This conversation |

### D. Pattern transfer note (SKILL → adopter-facing doc)

CORE-051 trimmed an AI-loaded SKILL surface. CORE-052's target is a human adopter cold-start doc. Pattern (cite-don't-restate) transfers but the audience differs:

- **What stays the same:** drop SPEC restatement; preserve only what's not derivable from a one-line cite + the cited file.
- **What's audience-specific:** an adopter reading this needs enough to know *what each variant is* and *where to read more*. A pure cite is fine because adopters who want detail are expected to follow it. Adopters who don't follow it lose nothing operationally (they're not executing this doc; the slash command + AI handles execution).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown adopter cold-start doc; no parser/test depends on this content)

**Implementation Notes:**

- **Pattern survey:** extended [[CORE-051]]'s cite-don't-restate shape (CORE-051 just merged; immediate sibling from same audit cohort). No new pattern needed. Audience differs (adopter cold-read vs AI execution) but the cite-only shape transfers cleanly — adopters who want detail follow the citation; cold-orientation only needs name + slash command + scaffold path + cite.
- **Files touched:** `templates/tasknote-README.md` only (lines 25-28).
- **Edit shape:** lines 25-27 (Standard / Starter / Micro variants) replaced with one-sentence cite-only forms; line 28 (Epic lifecycle) preserved verbatim per Phase 1 decision (already lean at 40w).
- **Per-line:**
  - Line 25 (Standard): 125w → 32w (-93w). Cited SPEC §"Tasknote frontmatter" + §"Tasknote body shape" (canonical schema), with inline parenthetical pointing to §"Task-line format" for model assignment (prevents adopters from assuming model goes in frontmatter). Dropped the inline restatement of frontmatter fields, body shape, model assignment paragraph, priority/area derivation, and wikilink convention — all in the cited SPEC sections.
  - Line 26 (Starter): 56w → 16w (-40w). Cited `SPEC/starter.md` for lifecycle. Dropped the "shares standard frontmatter but uses `status: starter`..." restatement.
  - Line 27 (Micro): 96w → 31w (-65w). Cited SPEC §"When to use a tasknote (and when not to)" for threshold. Dropped the inline `## ⚡ Notes` body-shape restatement and the bold-prefix prompt list (template carries it).
  - Line 28 (Epic lifecycle): 40w → 40w (preserved verbatim).
- **Final file:** **702w → 504w (-198w / -28.2%)**. Beats ≥175w acceptance with 23w slack.
- **Variant block specifically:** 317w → 119w (-198w / -62.5%).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI change)

**Testing Notes:**

- Functional verification = citation grep-verify + cold straight-through re-read of trimmed file (per Phase 1 Decision 5).
- **Citation grep:** all 4 SPEC heading citations matched against `^## ` in `SPEC.md`:
  - §"Tasknote frontmatter" — line 142 ✓
  - §"Tasknote body shape" — line 168 ✓
  - §"Task-line format" — line 78 ✓
  - §"When to use a tasknote (and when not to)" — line 334 ✓
- **Cited file paths:** all 5 resolve via `test -f`:
  - `templates/tasknote-template.md` ✓
  - `templates/tasknote-starter-template.md` ✓
  - `templates/tasknote-micro-template.md` ✓
  - `SPEC/starter.md` ✓
  - `SPEC/epic.md` ✓ (line 28 cite, preserved verbatim)
- **Cold straight-through re-read** (full 85-line read, not skim): adopter cold-start orientation flow intact (Layout intro → 4 variants → Area prefixes → Archive layout → AI-referenced docs → Quick commands). Each variant carries name + slash command + scaffold path + canonical citation. No template-shape regression.
- **Word-count cross-check:** 702w → **504w** (-198w / -28.2%); meets acceptance with 23w slack.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Trimmed `templates/tasknote-README.md` variant block (lines 25-28) via cite-don't-restate. Final: **702w → 504w (-198w / -28.2%)**. Variant block specifically: 317w → 119w (-198w / -62.5%). Beats ≥175w acceptance with 23w slack.

**Doc-drift sweep:** all 4 AI-referenced docs reviewed:
- `README.md` — no change
- `SPEC.md` — no change (cite target, not citer)
- `docs/MIGRATION.md` — no change for this trim. **Follow-up candidate surfaced:** §1.5 lines 95, 97-102 carry a parallel restatement of the variant block + body shape + epic lifecycle. Same cite-don't-restate principle would trim it. CORE-049's audit didn't flag it (likely because MIGRATION.md is one-time-read at adoption, not always-loaded). Recommend filing as a follow-up if continuing the workflow-token-audit cohort.
- `claude/CLAUDE-snippet.md` — no change

**Pattern extended:** [[CORE-051]] cite-don't-restate, applied per-variant:
- Line 25 (Standard, -93w): cited SPEC §"Tasknote frontmatter" + §"Tasknote body shape" + inline pointer to §"Task-line format" for model assignment (prevents adopter assumption that model goes in frontmatter).
- Line 26 (Starter, -40w): cited `SPEC/starter.md`.
- Line 27 (Micro, -65w): cited SPEC §"When to use a tasknote (and when not to)".
- Line 28 (Epic, preserved verbatim per Phase 1 decision; already lean at 40w).

**Drift handled:** starter projected savings 150-200w based on 290w variant block estimate. Verified actual variant block at 317w (line 25 had grown +55w post-CORE-049's model-assignment paragraph). Realistic projection raised to ~190w in Phase 1; final landing -198w hit the upper bound.

**No regressions** — 4 SPEC citations + 5 file path citations all resolve; cold straight-through re-read confirms adopter cold-start orientation intact (Layout intro → 4 variants → Area prefixes → Archive → AI-referenced docs → Quick commands).

**Verification request:** if you adopt or re-bootstrap a project via `/new-project` and inspect the generated `_project/tasknote/README.md`, the variant block (lines 25-28) should now read as 4 one-line pointers + cites instead of the prior 4 paragraphs. Lowest-friction eyeball is comparing this file's lines 25-28 before/after via `git diff HEAD~1`.

**Touched files:**

- `templates/tasknote-README.md` (trimmed)
- `_project/PLAN.md` (CORE-052 line flipped to stub + moved to `## Completed`)
- `_project/tasknote/CORE-052.md` → `_project/tasknote/archive/core/CORE-052.md` (this file)

**Archived:** 2026-05-09
