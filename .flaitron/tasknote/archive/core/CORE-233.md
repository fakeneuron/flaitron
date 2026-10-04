---
title: dep-gray-matter-stale
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-233 | dep-gray-matter-stale

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Determine whether `gray-matter` v5 (targeting `js-yaml` v4) has shipped; if so, bump `viz/package.json`; if not, document current state and close as a watch-note.

## ✅ Acceptance

- [ ] Checked npm for gray-matter v5 release status
- [ ] If v5 available: bumped `viz/package.json`, confirmed tests pass
- [ ] If v5 not yet available: current state documented; task closed as no-op with a note for future revisit

## 🧩 Subtasks

- [x] Check npm for latest gray-matter release and js-yaml peer dep
- [x] Decide: bump or close-as-watch-note
- [x] Execute the decision (close as no-op with state snapshot)

## 🔗 Related

- CORE-232 — viz-link-allowlist (sibling audit-security finding, closed 2026-05-30)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** gray-matter v5 has not shipped. Latest on npm is 4.0.3 (last published 2021); it uses `js-yaml ^3.13.1`. No v5 prerelease exists. Task is correctly scoped as a tracking check — the right action is to document current state and close as a no-op.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-017, CORE-023, CORE-024, CORE-042.3, CORE-042.1, CORE-098.11/14/15 mention gray-matter as a parser used by viz; none relate to a v5 upgrade. No load-bearing prior context.

- [x] **Drift check** — `viz/package.json` still has `"gray-matter": "^4.0.3"`. Description matches reality.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
- npm latest: gray-matter 4.0.3 (2021). No v5 exists or is in prerelease.
- gray-matter v4 bundles `js-yaml ^3.13.1` — the v3 chain the audit flagged.
- Zero active CVEs in the js-yaml v3 chain as of the audit (2026-05-30).
- Action: close as no-op with a documented state snapshot. The PLAN.md line already says "bump when available" — no bump is possible today.
- No clarifications needed. Assumption: "available" means a stable non-prerelease v5 on npm; we do not chase prerelease tags.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — pure watch-note; no code pattern to extend. No code changes.

- [x] Implemented the minimal solution — none required; deliverable is the state snapshot in Discovery Notes.

- [x] Updated/added tests for non-trivial behavior — N/A (no code change)

**Implementation Notes:**
No-op. gray-matter v5 has not shipped; the js-yaml v4 bump is blocked on upstream. Current state locked at `gray-matter ^4.0.3` / `js-yaml ^3.13.1`. Revisit when gray-matter cuts a v5 tag on npm.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code change)

- [x] Ran lint/type-check on changed code — N/A (no code change)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:**
No code was changed; testing phase is a no-op.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md — all no change (no code or doc changes made)

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**
Confirmed gray-matter v5 has not shipped (latest is 4.0.3, 2021; no prerelease). The js-yaml v3 → v4 upgrade remains blocked on upstream. No code change; closed as a no-op state snapshot. Revisit when a gray-matter v5 tag appears on npm.

**Archived:** 2026-05-30
