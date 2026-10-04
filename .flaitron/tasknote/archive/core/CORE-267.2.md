---
title: dogfood-checklist-convention
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-267, CORE-267.3, CORE-265]
---

# CORE-267.2 | dogfood-checklist-convention

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-267]] [[CORE-267.3]]

## 🎯 Goal

Define the cross-agent dogfood gate convention in `docs/AGENT-COMPAT.md`: add a `skipped @ vX.Y.Z` context-tag to the `last-verified` stamp vocabulary, and rewrite §"Reading the cells" update-obligation prose from soft refresh-guidance into a dogfood-or-explicit-skip release-gate obligation. No new artifact — the matrix rows are the checklist.

## ✅ Acceptance

- [ ] `skipped @ vX.Y.Z` context-tag added to the §"Reading the cells" context-tag vocabulary, with semantics: appends to the base tag (e.g. `dogfooded; skipped @ v5.0.0`); the stamp version prefix stays at the last *real* verification
- [ ] §"Reading the cells" update-obligation prose rewritten from soft refresh-guidance into a release-gate obligation — each dogfooded-agent row resolved at release (refresh from real verification OR record `skipped @ vX.Y.Z`)
- [ ] No new artifact; no `ft-release` SKILL edit (that's `.3`); no live stamp value changes (that's `.4`)
- [ ] Per-agent trigger-reference cross-ref (`claude/CAPABILITIES.md` / `docs/PLATFORMS.md` footers) preserved in the rewritten prose; downstream §"Cross-agent cue fallback policy" reference to the obligation still resolves
- [ ] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" at closure

## 🧩 Subtasks

- [ ] Re-read `docs/AGENT-COMPAT.md` §"Reading the cells" context-tag list + obligation paragraph (l.62–73) against HEAD
- [ ] Add the `skipped @ vX.Y.Z` bullet to the context-tag vocabulary with its compound-tag semantics
- [ ] Rewrite the update-obligation paragraph into a dogfood-or-explicit-skip release-gate obligation
- [ ] Verify the cross-ref to per-agent footers (l.72–73) and the downstream §"Cross-agent cue fallback policy" reference (l.106–111) still resolve
- [ ] Markdown mental-pass; Phase 4 doc-drift sweep + flip PLAN line + archive

## 🔗 Related

- [[CORE-EPIC-267]] — parent epic (release-dogfood-gate)
- [[CORE-267.3]] — consumes this convention; wires the gate into `ft-release` §5/§7
- [[CORE-265]] — release v5.0.0; made the ad-hoc explicit-skip call this convention productizes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Convention-definition child of `CORE-EPIC-267`, scoped concretely by the `.1` Discovery (archived). Clear single-doc edit; first in the dependency chain (.2 → .3 → .4). No re-scope warranted.

- [x] Read relevant source files — `docs/AGENT-COMPAT.md` §"Reading the cells" (l.44–73) + §"Cross-agent cue fallback policy" (l.86–111); CORE-267.1 discovery archive

- [x] **Archive skim** — see Discovery Notes

- [x] **Drift check** — see Discovery Notes

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Archive skim (core/)

- **`CORE-267.1.md`** (this epic's Discovery) — the direct scoper. Resolved-scoping table: explicit-skip notation = *extend the context-tag vocabulary* with `skipped @ vX.Y.Z` (keep honest last-real-verification AND record the deliberate skip); checklist form = reuse the existing matrix rows (no new artifact); gate scope = dogfooded agents only (Claude/Grok/Codex). Stamp shape for a skip: `v4.4.0 · … (dogfooded; skipped @ v5.0.0)`.
- **`CORE-224.*`** — established the matrix + the stamp format + the current (soft) update-obligation prose this task rewrites.
- **`CORE-265.md`** — the precedent: refreshed Claude stamps to v5.0.0, silently left Grok/Codex at v4.4.0. This convention makes that skip a *recorded* act.

### Drift check (HEAD)

- `docs/AGENT-COMPAT.md` §"Reading the cells" live at l.44–73; context-tag list l.63–68 (`dogfooded` / `docs-only · … (pre-adoption)` / `unverified`); update-obligation paragraph l.70–73. ✅
- Downstream §"Cross-agent cue fallback policy" references "the §'Reading the cells' update obligation" at l.106–111 — must still resolve after the rewrite. ✅
- No drift vs. the paths/concepts the `.1` Discovery cited.

### No clarifications needed — explicit assumptions

1. **Scope is `AGENT-COMPAT.md` only.** The `ft-release` walk (the *mechanism* that enforces the gate) is `CORE-267.3`; applying the tag to the live Grok/Codex stamps is `CORE-267.4`. This task touches neither — it defines the convention the doc states.
2. **The obligation prose may reference release-time enforcement / `ft-release`** as the point where each dogfooded row is resolved. The whole stamp surface is flowtron-self maintenance (ft-release is global-symlink, flowtron-self only), so naming it in this docs/ file is in-bounds. Phrased as the *rule* (what must hold at release), forward-compatible with `.3` wiring it — not a claim that the walk already exists.
3. **No SPEC contract edit** — confirmed by `.1`: the gate is a skill + doc concern, not the agent-neutral SPEC.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing context-tag bullet list (`AGENT-COMPAT.md` l.63–68) in the same style; the obligation paragraph rewrite stays in place at l.70. No new shape invented.

- [x] Implemented the minimal solution — two in-place edits to `docs/AGENT-COMPAT.md` §"Reading the cells"

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only; no executable surface)

**Implementation Notes:**

`docs/AGENT-COMPAT.md` §"Reading the cells", two edits in one block:

1. **New context-tag suffix.** After the three base tags, added a paragraph defining the `; skipped @ vX.Y.Z` suffix — compound modifier on a `dogfooded` tag (e.g. `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)`). Prefix stays pinned to the last *real* verification; suffix carries the latest skip version, bumped each release the row is skipped again.
2. **Obligation rewrite.** Replaced the soft "refresh the cell when…" prose with a **release gate (dogfood-or-explicit-skip)**: each row carrying a `dogfooded` history (Claude / Grok / Codex) must be *resolved* at every release — refreshed from real verification OR recorded as `skipped @ vX.Y.Z`; a silently-stale stamp is not a valid release state. `unverified` / `docs-only` rows are *noted-not-gated*. Named the enforcement point (`ft-release` §5/§7) — wired by [[CORE-267.3]], forward-compatible. Preserved the trailing cross-ref to `claude/CAPABILITIES.md` / `docs/PLATFORMS.md` stubs.

No `ft-release` SKILL edit (that's `.3`); no live stamp value changes (that's `.4`); no SPEC contract edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only)

- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend)

**Testing Notes:**

Markdown mental-pass on the edited block (l.62–87): two new paragraphs indented 2 spaces under the `- **Last verified**` bullet, matching the sub-content style · backtick / bold / italic spans balanced · base context-tag list intact · `§"Pre-adoption verification"` (l.91–98) stays consistent (unverified = noted-not-gated) · downstream `§"Cross-agent cue fallback policy"` reference to "the §'Reading the cells' update obligation" still resolves (obligation lives there, strengthened). Companion docs verified by grep: `PLATFORMS.md` carries bare stamp values only (no contradicting prose); `CAPABILITIES.md` l.56 delegates format+obligation back to this section; `CONVENTIONS.md` has no stamp prose. Clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — **no change** across 10 of 11 AI-referenced docs (README.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md). **Updated:** `docs/AGENT-COMPAT.md` (this task). PLATFORMS bare stamp values + CAPABILITIES delegation reference both stay consistent with the strengthened obligation; PLATFORMS/CAPABILITIES live-value updates are `CORE-267.4`, not here.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (kept nested under `CORE-EPIC-267` per epic-cohort grouping) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip — doc-only, no signal trips)

**Final Summary:**

Defined the cross-agent dogfood gate **convention** (first child of `CORE-EPIC-267`, before any wiring). Two edits to `docs/AGENT-COMPAT.md` §"Reading the cells": (1) added a `; skipped @ vX.Y.Z` context-tag suffix — a compound modifier that records a *deliberate* skip while keeping the stamp prefix pinned to the last real verification (e.g. `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)`); (2) rewrote the update-obligation prose from soft "refresh when…" guidance into a **release gate (dogfood-or-explicit-skip)** — every dogfooded-history row (Claude / Grok / Codex) must be resolved at each release (refresh-from-verification OR record a skip), with `unverified` / `docs-only` rows noted-not-gated. Enforcement point named as `ft-release` §5/§7 (wired by `.3`). No new artifact (matrix rows are the checklist), no SKILL edit, no live stamp changes. Convention now consumable by `.3` (wiring) and `.4` (debt-discharge).

**Archived:** 2026-06-01
