---
title: CONTRIBUTING.md
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.1, CORE-099.3]
---

# CORE-099.6 | CONTRIBUTING.md

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]] · [[CORE-099.1]] · [[CORE-099.3]]

## 🎯 Goal

Add a light `CONTRIBUTING.md` at the repo root with solo-maintained framing, a pointer to `SPEC.md` for conventions, and an "issues OK, PRs rare" stance — table-stakes contributor signal for an adoptable-via-submodule repo.

## ✅ Acceptance

- [x] `CONTRIBUTING.md` exists at repo root with: project framing, solo-maintained statement, "issues OK, PRs rare" stance, and pointers to `SPEC.md`, `docs/CONVENTIONS.md`, and `LICENSE`
- [x] `README.md` §Documents section lists `CONTRIBUTING.md` alongside the existing entries
- [x] Markdown style matches existing docs (heading hierarchy, prose-wrapped lines, no trailing whitespace)
- [x] Phase 4 doc-drift sweep across the 4 AI-referenced docs documented in tasknote

## 🧩 Subtasks

- [x] Draft `CONTRIBUTING.md` at repo root: intro / maintenance model / issues / PRs / where conventions live / licensing
- [x] Add `CONTRIBUTING.md` bullet to `README.md` §Documents
- [x] Phase 3 verification: visual proofread; no lint/test surface for markdown-only addition
- [x] Phase 4 closure: doc-drift sweep, PLAN.md flip, archive

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No `CONTRIBUTING.md` exists anywhere in the repo; [[CORE-099.1]] discovery sized this row as "Small (1 file) / Low — table-stakes for an adoptable repo." PLAN.md line still matches the filed discovery row (no drift). Sibling [[CORE-099.3]] explicitly scope-fenced CONTRIBUTING.md to this task. Clean greenfield.

- [x] Read relevant source files (`README.md`, `SPEC.md`, `docs/CONVENTIONS.md`, `LICENSE`)
- [x] **Archive skim** — three hits, see Discovery Notes
- [x] **Drift check** — PLAN.md line and discovery-row content match; no drift
- [x] Asked clarifying questions (location + README cross-link) — both answered via `AskUserQuestion`
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Repo state.** `ls` confirms no `CONTRIBUTING*` at root, in `.github/` (directory absent), or in `docs/`. No mentions of "contributing" in `README.md`, `SPEC.md`, `docs/CONVENTIONS.md`, `docs/MIGRATION.md`, or `LICENSE`. Greenfield.
- **Archive skim (`core/`).** Three hits — all sibling CORE-099 subtasks:
  - [[CORE-099.1]] (discovery) — axis #7 "Contributor guide" verdict: "Gap (or N/A for solo)"; filed row P2.c shape: "Light CONTRIBUTING.md: solo-maintained framing, pointer to SPEC.md, issues OK, PRs rare. Small (1 file). Low — table-stakes for an adoptable repo."
  - [[CORE-099.3]] (CONVENTIONS.md) — explicit scope-fence: "CONTRIBUTING.md belongs to sibling [[CORE-099.6]]. CONVENTIONS.md is reference-doc (what conventions exist); CONTRIBUTING is how-to-contribute." → File should cross-reference `docs/CONVENTIONS.md` (which has since landed), not just SPEC.md as the original discovery row read.
  - [[CORE-099.4]] (.editorconfig) — incidental cohort mention only; no design implications.
- **Doc-set posture.** README §Documents currently lists SPEC, PHILOSOPHY, MIGRATION, CONVENTIONS. CONTRIBUTING.md is missing → user confirmed add (`AskUserQuestion`).
- **Location.** Repo root per user confirmation (`AskUserQuestion`); matches LICENSE / README placement; no need to create `.github/`.
- **Content surface (synthesized from discovery row + scope fence + user answers):**
  - One-paragraph project framing (what flowtron is + adoption-via-submodule model).
  - Solo-maintained statement (single maintainer; AI-assisted edits).
  - "Issues welcome, PRs rare" stance with a one-line rationale.
  - Pointers: `SPEC.md` (workflow contract — required cold-start read), `docs/CONVENTIONS.md` (adherences + declines), `LICENSE` (MIT — relicensing requires permission).
  - Brief internal-development note: the tasknote system in `_project/` is the development log; external contributors don't drive it.
- **Size target.** "Light" per PLAN-line + discovery row; ~40-60 lines (well under CONVENTIONS.md's reference-doc footprint).
- **Doc-drift propagation preview for Phase 4.**
  - `README.md` — add CONTRIBUTING.md bullet under §Documents (user-confirmed).
  - `SPEC.md` — no change (workflow contract; CONTRIBUTING is meta-doc).
  - `docs/MIGRATION.md` — no change (adoption guide for adopters; CONTRIBUTING is for contributing *to flowtron itself*).
  - `claude/CLAUDE-snippet.md` — no change (adopter assistant-facing surface; orthogonal to contributor guide).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched `docs/CONVENTIONS.md` / `docs/PHILOSOPHY.md` shape (H2/H3 hierarchy, bolded-lead bullets, semantic-newline paragraphs, relative-path cross-refs, em-dashes); no new shape introduced
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior (N/A — markdown-only addition)

**Implementation Notes:**

- Created `CONTRIBUTING.md` at repo root (~47 lines). Sections: opening framing paragraph, **Maintenance model** (3 bullets: one maintainer / AI-assisted / adoption-first), **Filing issues** (4 useful kinds + open-ended caveat), **Pull requests** (3-step issue-first flow; scope-vs-quality note), **Where conventions live** (4 pointers: SPEC.md, CONVENTIONS.md, MIGRATION.md, PHILOSOPHY.md), **Licensing** (MIT; contributions accepted under same license).
- Added one bullet to `README.md` §Documents (2 lines) cross-referencing the new file.
- **Cross-link expansion.** Discovery row originally specified pointers to "SPEC.md only"; expanded the set per [[CORE-099.3]]'s scope-fence — CONVENTIONS.md is the actual conventions doc (landed after discovery filing). Added MIGRATION.md to anchor the adoption-first bullet and PHILOSOPHY.md to back the "solo by design" framing. All four sibling docs now form a coherent index from CONTRIBUTING.
- **Style decisions.** First-person voice ("me") matches PHILOSOPHY.md; bolded bullet leads match CONVENTIONS.md; semantic newlines (paragraphs on one line) match both sibling docs; relative paths used for all cross-refs (file sits at repo root, so paths resolve correctly).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code (N/A — markdown-only addition; no test surface)
- [x] Ran lint/type-check on changed code (N/A — flowtron declines markdownlint per [[CORE-099.1]] discovery axis #9; manual sweep is the convention)
- [x] (frontend) Asked the user for visual confirmation (N/A — no frontend change)

**Testing Notes:**

- Markdown-only change. No test / lint / type-check surface applies.
- Manual proofread: heading hierarchy clean (H1 → H2), no trailing whitespace, all cross-refs use relative paths from repo root (verified all 5 targets exist: `SPEC.md`, `docs/CONVENTIONS.md`, `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `LICENSE`), em-dash usage matches sibling docs.
- File renders as GFM cleanly (standard fenced-block / list / link syntax; nothing exotic).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-18.` in-place under [[CORE-EPIC-099]] (epic-subtask convention: completed children stay nested under the parent epic, not migrated to §Completed) and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Doc-drift sweep (4 AI-referenced docs):**

- `README.md` — **UPDATED**: appended `CONTRIBUTING.md` bullet to §Documents (this task).
- `SPEC.md` — no change (workflow contract; CONTRIBUTING is repo-meta, not a workflow surface).
- `docs/MIGRATION.md` — no change (adopter-facing adoption procedure; CONTRIBUTING addresses how to engage with the flowtron repo itself, orthogonal to adopters' migration paths).
- `claude/CLAUDE-snippet.md` — no change (adopter assistant-facing surface; CONTRIBUTING is repo-meta and doesn't shape what adopters' assistants see).

**Final Summary:**

Added a light `CONTRIBUTING.md` at the repo root (~47 lines) establishing flowtron's solo-maintenance model, issue-welcome / PR-rare stance, and pointers to the canonical workflow + convention surfaces. Cross-linked from `README.md` §Documents alongside SPEC / PHILOSOPHY / MIGRATION / CONVENTIONS. Sixth of seven children under [[CORE-EPIC-099]]; only the closing audit subtask `.7` remains.

**Files changed:**

- `CONTRIBUTING.md` (new, ~47 lines)
- `README.md` (+2 lines under §Documents)
- `_project/PLAN.md` (line 36 in-place flip to stub form)
- `_project/tasknote/CORE-099.6.md` → `_project/tasknote/archive/core/CORE-099.6.md`

**Key decisions:**

- Repo root over `.github/` (user-confirmed via `AskUserQuestion`).
- README cross-link added (user-confirmed via `AskUserQuestion`).
- Pointer set expanded from discovery row's "SPEC.md only" to include `docs/CONVENTIONS.md` + `docs/MIGRATION.md` + `docs/PHILOSOPHY.md` — CONTRIBUTING is the natural doc-set entry-point and should index its siblings.

**Archived:** 2026-05-18
