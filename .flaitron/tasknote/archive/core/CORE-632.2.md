---
title: readme-logo-webp
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-632]
touches:
  - README.md
  - LOGO.webp
  - LOGO.png
---

# CORE-632.2 | readme-logo-webp

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-632]]

## 🎯 Goal

Point README.md's logo `<img>` at a small webp and drop the 446,650-byte LOGO.png.

## ✅ Acceptance

- [x] README.md's logo `<img src>` points at a webp file ≤ 10 KB — `grep -n 'LOGO' README.md`
- [x] `LOGO.png` removed from the repo root — `test ! -f LOGO.png`
- [x] No remaining reference to `LOGO.png` in tracked files — `git grep -n LOGO.png`

## 🧩 Subtasks

- [x] Copy `viz/public/LOGO.webp` to a root `LOGO.webp` (or reference `viz/public/LOGO.webp` directly — decide during Discovery)
- [x] Update README.md's `<img src="LOGO.png">` to the webp path
- [x] `git rm LOGO.png`
- [x] Verify no other tracked file references `LOGO.png`

## 🔗 Related

- [[CORE-EPIC-632]] — parent epic (adopter-footprint)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line is current; `LOGO.png` (446,650 bytes) still sits at repo root and README.md:4 still references it; `viz/public/LOGO.webp` (4,566 bytes) exists as the reuse candidate the line names.

- [x] Read relevant source files — read README.md (single `<img>` reference at line 4), confirmed `viz/public/LOGO.webp` exists and is 4,566 bytes (under the 10 KB cap).

- [x] **Best Practices Review** — N/A, this is an asset swap + doc-path edit, no code module boundaries involved.

- [x] **Archive skim** — `archive/core/` skimmed for CORE-632.* siblings; none archived yet (CORE-632.2 is the first child of CORE-EPIC-632 to run). No prior tasknote touched README.md's logo.

- [x] **Drift check** — no drift: `LOGO.png` is 446,650 bytes at root, `viz/public/LOGO.webp` is 4,566 bytes, README.md:4 is `<img src="LOGO.png" alt="flowtron logo" width="200">`, matching the task description exactly.

- [x] Asked clarifying questions OR logged "No clarifications needed (--fast)" with explicit assumptions — No clarifications needed (--fast — implied by unattended posture). Assumption: reuse `viz/public/LOGO.webp` by copying it to a root `LOGO.webp` (keeps README's root-relative path convention intact rather than reaching into `viz/public/`).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared.

**Discovery Notes:** Checked `/ft-release` §7.1 area and `docs/` via `grep -rn "LOGO.png"` across the repo (excluding tasknote archive) — only `README.md:4` and the PLAN.md task lines themselves reference `LOGO.png`. No release-doc or `docs/` path references it. Safe to swap and delete.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, single-file asset swap; mirrors the FE-058/CORE-329.3 precedent of a small tracked `LOGO.webp` referenced by `<img src>`.

- [x] **Minimal refactor gate** — N/A, no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, doc/asset-only change with no test surface.

**Implementation Notes:** Copied `viz/public/LOGO.webp` (4,566 bytes) to a new root `LOGO.webp`. Updated `README.md:4` `<img src="LOGO.png">` → `<img src="LOGO.webp">`. `git rm LOGO.png` (446,650 bytes). All three changes staged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, doc/asset-only change.

- [x] Ran lint/type-check on changed code — N/A, doc/asset-only change.

- [x] **Verification receipt**
  - `grep -n 'LOGO' README.md` → exit 0, `4:  <img src="LOGO.webp" alt="flowtron logo" width="200">`
  - `test ! -f LOGO.png` → exit 0 (absent)
  - `git grep -n LOGO.png` → exit 0, hits confined to `.flowtron/PLAN.md` (this task's own line text) and archived tasknotes under `.flowtron/tasknote/archive/`; no live doc or code reference remains
  - No duplication, dead code, or stale code-facing documentation introduced.

- [x] (frontend) Asked the user for visual confirmation — N/A, `--unattended`; operator owns visual confirmation per posture.

**Testing Notes:** `LOGO.webp` is 4,566 bytes, under the 10 KB cap the task line set. README's only logo reference now points at it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs": no entry references the repo-root README logo or `LOGO.png`/`LOGO.webp`; no change needed.

- [x] Closed — all Acceptance criteria ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested under `CORE-EPIC-632`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted (below).

**Final Summary:** Swapped README.md's logo from the 446,650-byte `LOGO.png` to a new root `LOGO.webp` (4,566 bytes, copied from the existing `viz/public/LOGO.webp`), and removed `LOGO.png` via `git rm`. Changed files: `README.md` (1 line), `LOGO.webp` (added, 4,566 bytes), `LOGO.png` (deleted). No refactors made or deferred. Documentation verdict: no other doc references `LOGO.png`. `touches:` scope reconciliation: declared `README.md`, `LOGO.webp`, `LOGO.png` — matches `git diff --name-only` exactly. Maintainability effect: repo root sheds ~442 KB of tracked binary weight; README's rendered logo is unchanged visually (same artwork, same 200px width) since both PNG and WebP derive from the same source image adopted in CORE-329.3.

**Archived:** 2026-09-20
