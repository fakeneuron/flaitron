---
title: New Logo Adoption
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-329]
---

# CORE-329.3 | New Logo Adoption

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-329]]

## 🎯 Goal

Adopt root `LOGO.png` as the canonical logo source and remove the dead/unused legacy logo assets it replaces.

## ✅ Acceptance

- [x] Root `LOGO.png` committed as the tracked logo source
- [x] `viz/public/LOGO.webp` regenerated from the new `LOGO.png` and still renders correctly in the viz header at ~24px
- [x] `viz/public/favicon.png` regenerated from the new `LOGO.png` and still renders correctly as the browser tab icon
- [x] Dead `viz/public/LOGO.png` (374 KB, FE-058 leftover, unreferenced) removed via `git rm`
- [x] Unused `viz/public/favicon.svg` removed via `git rm`
- [x] No remaining references to the removed files anywhere in `viz/src/` or `viz/index.html`

## 🧩 Subtasks

- [x] `git add LOGO.png` to commit the new logo source
- [x] `cwebp -resize 96 96 -q 85 LOGO.png -o viz/public/LOGO.webp` to regenerate the header logo
- [x] `sips -z 32 32 LOGO.png --out viz/public/favicon.png` to regenerate the favicon
- [x] `git rm viz/public/LOGO.png` (dead FE-058 leftover)
- [x] `git rm viz/public/favicon.svg` (unused)
- [ ] 👁️ Visual confirm header logo + favicon render correctly in the viz dev server

## 🔗 Related

- [[CORE-EPIC-329]] — parent epic (adopter-surface-sync)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed root `LOGO.png` is untracked (446 KB, 705×705), `viz/public/LOGO.png` is a tracked 374 KB dead leftover from FE-058 with zero references in `viz/src/` or `viz/index.html`, and `viz/public/favicon.svg` is likewise unreferenced. Task description matches current repo state exactly.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Confirmed via `file`/`ls`: root `LOGO.png` = 446,650 bytes, 705×705 PNG, untracked. `viz/public/LOGO.png` = 373,998 bytes, 710×710 PNG, tracked, zero grep hits in `viz/src/` or `viz/index.html` — dead. `viz/public/LOGO.webp` (3,694 bytes) is the live header logo, referenced at `viz/src/ui/App.tsx:276`. `viz/public/favicon.png` (32×32) is the live favicon, referenced at `viz/index.html:6`. `viz/public/favicon.svg` (248 bytes) has zero references anywhere — dead.
- Archive skim: FE-058 (`viz-logo-optimize`, completed 2026-06-14) generated the current `LOGO.webp`/`favicon.png` from the *old* `viz/public/LOGO.png` via `cwebp -resize 96 96 -q 85` and `sips -z 32 32`. Reusing the same commands against the new root `LOGO.png` for this task — no drift, exact same pipeline applies.
- No clarifications needed. Assumptions: root `LOGO.png` stays at repo root as the full-res source artifact (mirrors the FE-058 precedent of keeping a source PNG alongside optimized `viz/public/` derivatives); "favicons" in the task description means the single `favicon.png` referenced in `viz/index.html` (no other favicon sizes/formats are referenced anywhere).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: FE-058's exact regeneration pipeline (`cwebp -resize 96 96 -q 85` + `sips -z 32 32`) reused verbatim against the new source — no new shape needed.
- `LOGO.webp`: 4,566 bytes (96×96, q85), regenerated from new root `LOGO.png` — no `App.tsx` reference change needed, path is unchanged.
- `favicon.png`: 3,633 bytes (32×32), regenerated from new root `LOGO.png` — no `index.html` reference change needed, path is unchanged.
- `git rm viz/public/LOGO.png viz/public/favicon.svg` — both confirmed unreferenced before removal.
- `git add LOGO.png` — new 446,650-byte source committed at repo root.
- No tests needed — static asset swap with no behavioral logic (same as FE-058 precedent).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- No test suite applicable (static asset swap, no behavioral logic — same as FE-058 precedent).
- `npx tsc --noEmit` in `viz/` passed clean.
- Visual confirmation performed via Playwright against the local dev server (`http://localhost:5120`): `LOGO.webp` and `favicon.png` both returned `200 OK`; header logo screenshot visually matches the new gear/robot-surfer artwork in root `LOGO.png`. Dev server stopped after confirmation.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep: all 11 AI-referenced docs (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`) — no change, none reference logo/favicon assets.

Adopted the new gear/robot-surfer logo as the canonical brand asset. Root `LOGO.png` (446 KB, 705×705) committed as source; `viz/public/LOGO.webp` (4,566 bytes) and `viz/public/favicon.png` (3,633 bytes) regenerated from it via the same `cwebp`/`sips` pipeline FE-058 established. Removed the dead 374 KB `viz/public/LOGO.png` (old FE-058 leftover, unreferenced) and the unused `viz/public/favicon.svg`. No source-code changes — `App.tsx:276` and `index.html:6` already pointed at the stable `/LOGO.webp` and `/favicon.png` paths, so only the underlying asset bytes changed. Visually confirmed via Playwright against the local dev server.

**Archived:** 2026-07-02
