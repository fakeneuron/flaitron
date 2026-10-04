---
title: integration-wiring
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-223, CORE-223.1, CORE-223.5]
---

# CORE-223.4 | integration-wiring

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-223]] [[CORE-223.1]] [[CORE-223.5]]

## 🎯 Goal

Wire the two new lazy modules (`SPEC/gates.md`, `SPEC/tasknote-selection.md`) into the spec surface: add `paths:` frontmatter, refresh SPEC.md's module-list sections, verify the always-read budget margin, and sweep doc currency across GLOSSARY/PLATFORMS/AGENT-NEUTRALITY/MIGRATION + README.

## ✅ Acceptance

- [x] `paths: []` frontmatter added to both `SPEC/gates.md` and `SPEC/tasknote-selection.md` (status/content triggers → empty array per §"Lazy SPEC module frontmatter")
- [x] SPEC §"Lazy SPEC module frontmatter" "remaining modules" list includes `gates` + `tasknote-selection`
- [x] SPEC §"Working in the flowtron repo itself" module list reviewed — `SPEC/` bullet is a generic "lazy SPEC modules loaded on demand" line with no per-module enumeration; no change needed
- [x] SPEC.md verified under the ~40k always-read budget with comfortable margin (25,789 chars ≈ 64%)
- [x] Doc-currency sweep complete: broken `SPEC §"…"` refs (sections moved to modules) retargeted; valid SPEC anchors left as-is; per-entry verdicts recorded

## 🧩 Subtasks

- [x] Add `paths: []` frontmatter block to `SPEC/gates.md`
- [x] Add `paths: []` frontmatter block to `SPEC/tasknote-selection.md`
- [x] Update SPEC §"Lazy SPEC module frontmatter" remaining-modules enumeration
- [x] Confirm/adjust SPEC §"Working in the flowtron repo itself" SPEC/ description — no change (generic line)
- [x] Verify SPEC.md char count (margin under 40k) — 25,789 chars
- [x] Retarget broken GLOSSARY refs (§"Conditional skip rule" → `SPEC/gates.md`) — lines 29, 83
- [x] Sweep PLATFORMS / MIGRATION / AGENT-NEUTRALITY / README for stale module refs — all resolve to live anchors; no change

## 🔗 Related

- [[CORE-EPIC-223]] — parent epic (spec-lazy-module-split)
- [[CORE-223.1]] — discovery; defined extraction boundaries + this child's scope
- [[CORE-223.5]] — final-subtask audit (verifies module loads, cross-refs, byte targets)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2`/`.3` extracted gate machinery → `SPEC/gates.md` and the selection matrix → `SPEC/tasknote-selection.md`, dropping SPEC.md from 39,862 → 25,754 chars. Neither new module yet carries `paths:` frontmatter, and the SPEC module-list + doc cross-refs still need the integration pass this child owns. Still the right work.

- [x] Read relevant source files — SPEC.md (full), SPEC/gates.md + SPEC/tasknote-selection.md (headings + frontmatter state), SPEC/epic.md (frontmatter precedent), tasknote/README.md, and grepped GLOSSARY/PLATFORMS/MIGRATION/AGENT-NEUTRALITY for moved-section refs.

- [x] **Archive skim** — `CORE-223.1` (discovery) is the load-bearing prior tasknote: it defined this child's scope and flagged the SPEC module-list sections + skill Step-0 enumerations as candidates. `.2`/`.3` archives not yet present (closed in PLAN but tasknotes already moved). No regressions to avoid; lazy-module frontmatter pattern established by `SPEC/epic.md`.

- [x] **Drift check** — verified against current HEAD:
  - SPEC.md = 25,754 chars (`.1` projected ≈24,700; close enough — comfortable margin under 40k). ✓
  - `SPEC/gates.md` (10,097 ch) headings: Operator-gate cues · Phase 1→2 exit gate · Conditional skip rule · `--fast` operator override. No `paths:` frontmatter. ✓
  - `SPEC/tasknote-selection.md` (7,607 ch) headings: When to use · filing-discipline thresholds · `## Completed` convention. No `paths:` frontmatter. ✓
  - SPEC.md retains anchor headings §"Operator-gate cues" + §"When to use a tasknote (and when not to)" (thin pointers), but **no** §"Conditional skip rule" heading → doc refs to that section are broken.
  - **Drift surfaced:** `.1` notes named "skill Step-0 SPEC_DIR enumeration" as needing the new module names, but the filed `.4` PLAN line scopes only SPEC sections + 5 docs (GLOSSARY/PLATFORMS/AGENT-NEUTRALITY/MIGRATION + README) — skill SKILL.md files are not listed. Surfaced to operator as a clarifying question (see below).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Q (asked via AskUserQuestion):** Should `.4` also update the per-skill Step-0 `SPEC_DIR (lazy modules …)` enumerations to list `gates.md` + `tasknote-selection.md`?
  **Assumptions pending answer:** the Step-0 roster enumerates *dispatch-fragment-loaded* modules per skill (ft-micro-task lists only epic+model); gates/selection are referenced inline (`per SPEC/gates.md §…`), not dispatch-loaded — so under a strict reading they don't belong in that roster, and the filed PLAN line excludes them.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Doc-currency findings (surgical reading — fix only broken refs, leave resolvable SPEC anchors):**

| Doc | Line | Ref | Verdict |
|---|---|---|---|
| GLOSSARY.md | 29 | SPEC §"Conditional skip rule" | **broken** (no SPEC heading) → `SPEC/gates.md §"Conditional skip rule"` |
| GLOSSARY.md | 83 | SPEC §"Conditional skip rule" | **broken** → `SPEC/gates.md §"Conditional skip rule"` |
| GLOSSARY.md | 67/73/85 | SPEC §"Operator-gate cues" | resolves (SPEC anchor exists) → no change |
| PLATFORMS.md | 159/182 | SPEC §"Operator-gate cues" | resolves → no change |
| MIGRATION.md | 150 | SPEC §"When to use a tasknote" | resolves (SPEC anchor exists) → no change |
| AGENT-NEUTRALITY.md | — | (none) | no refs to moved sections → no change |
| README.md (tasknote) | 44 | `SPEC/*.md` generic | no per-module enumeration → no change |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `SPEC/epic.md` is the precedent for module `paths:` frontmatter (`paths: ['*-EPIC-*.md', '*.[0-9]*.md']`); the §"Lazy SPEC module frontmatter" contract prescribes `paths: []` for status/content-triggered modules. Followed both exactly — no new shape invented.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — n/a (markdown-only; no code surface).

**Implementation Notes:**

Five edits, all docs:
- `SPEC/gates.md` — prepended `---\npaths: []\n---` frontmatter.
- `SPEC/tasknote-selection.md` — prepended `---\npaths: []\n---` frontmatter.
- `SPEC.md` §"Lazy SPEC module frontmatter" — added `gates` · `tasknote-selection` to the remaining-modules enumeration (status/content triggers → `paths: []`).
- `docs/GLOSSARY.md` — retargeted two broken refs (l.29 Conditional skip rule, l.83 privileged-ops) from `SPEC §"Conditional skip rule"` → `SPEC/gates.md §"Conditional skip rule"` (the heading no longer exists in SPEC.md; canonical is gates.md).

No change needed: SPEC §"Working in the flowtron repo itself" `SPEC/` bullet (generic, no enumeration); PLATFORMS/MIGRATION §"Operator-gate cues"/§"When to use a tasknote" refs (resolve to live SPEC anchors); AGENT-NEUTRALITY (no moved-section refs); README (generic `SPEC/*.md` mention).

**Scope decision (operator-confirmed):** skill Step-0 `SPEC_DIR (lazy modules …)` rosters left untouched. They enumerate dispatch-fragment-loaded modules (each maps 1:1 to a Read dispatch step); gates/selection are inline-referenced at point-of-use with fully-qualified paths, so adding them would break that pattern. Matches the filed PLAN scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (markdown-only; no code).

- [x] Ran lint/type-check on changed code — n/a (no code). Verified `wc -c SPEC.md` = 25,789 (budget margin) and grepped docs for residual broken refs (none).

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a (no frontend).

**Testing Notes:** Pure docs change. Verification = char-count budget check + broken-ref grep, both clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — **updated** (frontmatter-section module list)
  - `docs/MIGRATION.md` — no change (§"When to use a tasknote" ref resolves to live anchor)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (no moved-section refs)
  - `docs/PLATFORMS.md` — no change (§"Operator-gate cues" refs resolve to live SPEC anchor)
  - (GLOSSARY.md is a lazy doc, not in the AI-referenced list; updated under the PLAN-scoped currency sweep above.)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` (parent `CORE-EPIC-223` stays open until `.5` audit) and tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (inline on conditional skip).

**Final Summary:** Integration-wiring pass for the lazy-module split. Added `paths: []` frontmatter to `SPEC/gates.md` and `SPEC/tasknote-selection.md` (status/content triggers, per the §"Lazy SPEC module frontmatter" contract), added both to SPEC.md's remaining-modules enumeration, and retargeted two broken `SPEC §"Conditional skip rule"` glossary refs to `SPEC/gates.md`. Verified SPEC.md at 25,789 chars (≈64% of the ~40k budget — comfortable margin, down from 39,862 pre-split). Doc-currency sweep across PLATFORMS/MIGRATION/AGENT-NEUTRALITY/README found all other refs resolve to live SPEC anchors (no change). Skill Step-0 rosters left as-is per operator confirmation. Only `.5` audit remains on CORE-EPIC-223.

**Archived:** 2026-05-30
