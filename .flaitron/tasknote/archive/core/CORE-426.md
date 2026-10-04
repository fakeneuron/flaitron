---
title: SPEC templates cross-ref
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: []
---

# CORE-426 | SPEC templates cross-ref

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix SPEC.md's templates-roster clause at line 55, which points to MIGRATION §1.2.1 (audit-scaffold forking) — drop or narrow the parenthetical so the cross-ref is accurate.

## ✅ Acceptance

- [x] SPEC.md:55 templates-roster clause no longer misdirects to MIGRATION §1.2.1 for audit-scaffold forking

## 🧩 Subtasks

- [ ] Narrow the `(see docs/MIGRATION.md §1.2.1)` parenthetical in SPEC.md:55 so it scopes to the audit-overlay template specifically, not the whole templates roster
- [ ] Re-read the edited line for grammatical fit

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed by direct read of both cited files — SPEC.md:55's templates-roster clause and MIGRATION.md §1.2.1 — that the parenthetical is over-broad. Fix is well-scoped.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A — pure documentation cross-reference fix, no code or module boundary touched.

- [x] **Archive skim** — `grep -l "SPEC.md:55\|templates-roster\|templates roster" .flowtron/tasknote/archive/core/*.md` returned no directly relevant hits (matches were unrelated roster mentions). PLAN.md's `## Completed` log shows CORE-365 (2026-07-25) is the origin of this parenthetical ("extended ft-flowtron's templates/ parenthetical with spec, loop-heartbeat, and audit-overlay"), but its tasknote file is not present in the archive (predates current retention or was pruned) — nothing load-bearing to carry forward.

- [x] **Drift check** — SPEC.md:55 current text confirmed verbatim against the task description (still cites `docs/MIGRATION.md §1.2.1` for the whole templates roster). MIGRATION.md §1.2.1 ("Optional: fork the `/ft-audit` scaffold per stack") confirmed to document only `audit-overlay-template.md` usage (one `cp` line at MIGRATION.md:119) — it says nothing about the tasknote templates (full/micro/starter/sidequest), `spec-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md`, or the `PLAN.md`/`tasknote-README.md` seed files. No contradiction with a SPEC contract or PLAN.md line; task description matches current repo state exactly.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: "narrow" (chosen over "drop") because §1.2.1 does genuinely document the audit-overlay template's usage — the citation is worth keeping, just scoped correctly instead of implying it covers all eight templates + two seed files.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

SPEC.md:55 (verbatim before fix):
> The `templates/` folder holds the canonical tasknote templates (full, micro, starter, sidequest) plus spec, loop-heartbeat, audit-overlay, and subagent-probe templates, and the `PLAN.md` / `tasknote-README.md` seed files (see [`docs/MIGRATION.md`](docs/MIGRATION.md) §1.2.1).

MIGRATION.md §1.2.1 only references `templates/audit-overlay-template.md` (two hits, lines 119 and 189) — nothing else in the templates/ roster. Fix: move the `§1.2.1` citation inline next to "audit-overlay" so it reads as scoped to that one template, matching the citation style already used elsewhere in SPEC.md (e.g. line 60's `docs/MIGRATION.md` §1.0 reference, line 548's `templates/subagent-probe-template.md` link).

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing inline-citation style already used elsewhere in SPEC.md (e.g. line 548's `[templates/subagent-probe-template.md](templates/subagent-probe-template.md)` link, scoped to the one template it names) rather than inventing a new citation shape.

- [x] **Minimal refactor gate** — single-sentence edit only; no adjacent prose touched.

- [x] Implemented the minimal solution — moved the `(see docs/MIGRATION.md §1.2.1)` parenthetical inline after "audit-overlay" as `(usage: [docs/MIGRATION.md](docs/MIGRATION.md) §1.2.1)`, so the citation now scopes to the one template it actually documents instead of the whole templates-roster clause.

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc fix.

**Implementation Notes:**

Checked for a mirror-pair copy of this sentence (README.md §"Repo layout" also lists the templates roster, per CORE-422's precedent of README/SPEC roster mirrors). README.md:255's version never carried the MIGRATION §1.2.1 parenthetical in the first place — it's a terse repo-layout bullet with no citations at all — so no corresponding edit needed there. Confirmed via `grep -rn "canonical tasknote templates (full, micro, starter, sidequest)"` across the repo: only SPEC.md:55 and README.md:255 match, and only SPEC.md:55 carried the parenthetical.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only Markdown edit to SPEC.md; no code path touched, no gate applies.

- [x] Ran lint/type-check on changed code — N/A, no code changed. Manually verified the edited line's Markdown link syntax renders correctly (`grep -n "audit-overlay" SPEC.md`).

- [x] **Quality assertions** — N/A, single-sentence citation fix; no duplication/dead-code/complexity/public-surface concerns apply to a doc cross-reference.

- [x] (frontend) N/A — no frontend surface touched.

**Testing Notes:**

Verified no other file in the repo carries the same over-broad `(see docs/MIGRATION.md §1.2.1)` parenthetical pattern that would need the identical fix (grep in Phase 2 Implementation Notes covers this).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (its templates-roster bullet never carried the §1.2.1 parenthetical; nothing to fix there).
  - `SPEC.md` — updated (this task's fix, line 55).
  - `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — no change; none reference this citation.

- [x] Closed — Acceptance criterion ticked below; `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and tasknote archived in this same closure pass.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Narrowed the over-broad `(see docs/MIGRATION.md §1.2.1)` citation in `SPEC.md:55`. That parenthetical sat at the end of the whole templates-roster clause (tasknote templates, spec/loop-heartbeat/audit-overlay/subagent-probe templates, `PLAN.md`/`tasknote-README.md` seed files), implying MIGRATION §1.2.1 documents all of it — but §1.2.1 ("Optional: fork the `/ft-audit` scaffold per stack") only ever mentions `audit-overlay-template.md` (two `cp` lines). Moved the citation inline, right after "audit-overlay", as `(usage: [docs/MIGRATION.md](docs/MIGRATION.md) §1.2.1)`, matching the existing inline-citation style already used at SPEC.md:548 for `subagent-probe-template.md`.

1 file changed, 1 line edited (`SPEC.md:55`). No code, no tests. Verified via grep that no mirror copy of this sentence (README.md:255's repo-layout bullet) carried the stale parenthetical, so no second edit was needed. Doc-drift sweep: no other AI-referenced doc affected. No refactor needed or performed — single-sentence prose fix.

**Archived:** 2026-08-09
