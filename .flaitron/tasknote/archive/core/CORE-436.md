---
title: CI build badge
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-383, CORE-430.N]
---

# CORE-436 | CI build badge

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-383]] [[CORE-430.N]]

## 🎯 Goal

Add an honest GitHub Actions build-status badge to `README.md`'s shields row, now that `.github/workflows/ci.yml` exists.

## ✅ Acceptance

- [x] `README.md` badge row includes a shields.io `github/actions/workflow/status` badge with `flat-square` style
- [x] Badge links to the repo's GitHub Actions tab (workflow view)
- [x] Badge sits alongside the existing license and version shields without reordering other above-fold content

## 🧩 Subtasks

- [x] Confirm CI workflow filename and shields.io URL shape
- [x] Add the build badge anchor to `README.md` badge row
- [x] Verify badge URL resolves and matches existing shield conventions

## 🔗 Related

- [[CORE-383]] — chose license + version only because no CI existed
- [[CORE-430.N]] — audit F4 surfaced this follow-up

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CI shipped in CORE-430.2; README badge row still has only license + version per CORE-383's honest omission. PLAN line and audit finding remain accurate at HEAD.

- [x] Read relevant source files — `README.md` badge row (lines 7–10), `.github/workflows/ci.yml` (workflow `name: CI`, file `ci.yml`), archived `CORE-383.md` + `CORE-430.N.md` F4.

- [x] **Best Practices Review** — `N/A` (markdown-only; no module boundaries). Match existing shields: `flat-square`, centered `<p>`, `fakeneuron/flowtron` owner/repo.

- [x] **Archive skim** — `CORE-383` established two-shield row (no build badge — no CI). `CORE-430.N` F4 filed this task. `CORE-430.2` shipped `ci.yml`. No contradicting badge decisions since.

- [x] **Drift check** — `.github/workflows/ci.yml` exists; badge row still license + version only; PLAN description matches HEAD.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Workflow file: `ci.yml` (shields.io uses filename, not `name: CI`).
- Badge src: `https://img.shields.io/github/actions/workflow/status/fakeneuron/flowtron/ci.yml?style=flat-square`
- Link target: `https://github.com/fakeneuron/flowtron/actions/workflows/ci.yml`
- Placement: after version badge (build status is operational signal; license/version are metadata).
- **Assumptions:** no branch query param (default branch `main` matches CI trigger); alt text `CI build status`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extend existing `<a><img></a>` shield pattern from lines 8–9; same `style=flat-square`, same centered paragraph.

- [x] **Minimal refactor gate** — N/A; single-line addition, no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown presentation only).

**Implementation Notes:**

Added one `<a><img>` shield after the version badge in `README.md:10`. Matches CORE-383 shield conventions (`flat-square`, centered row).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only).

- [x] Ran lint/type-check on changed code — N/A (markdown-only).

- [x] **Quality assertions** — N/A (single-line HTML anchor; no code surface).

- [x] (frontend) Asked the user for visual confirmation — N/A (README shields badge, not viz UI; verified badge endpoint returns HTTP 200 via `curl -sI`).

**Testing Notes:**

`curl -sI https://img.shields.io/github/actions/workflow/status/fakeneuron/flowtron/ci.yml?style=flat-square` → HTTP/2 200, `content-type: image/svg+xml`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all AI-referenced docs: no change (badge is README presentation only; no contract or convention doc cites the badge set).

- [x] Closed — Acceptance satisfied; YAML `status: completed`; PLAN stub flipped; archived to `archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Added the CI build-status shield CORE-430.N F4 identified as honest once `.github/workflows/ci.yml` shipped. One line in `README.md` badge row; shields.io endpoint verified live.

**Archived:** 2026-08-12
