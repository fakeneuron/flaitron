---
title: release v5.7.1
status: completed
tags: []
created: 2026-06-14
related-tasks: [CORE-EPIC-324, CORE-319]
---

# CORE-325 | release v5.7.1

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-324]]

## 🎯 Goal

Cut the v5.7.1 patch release tagging the viz surface fixes (FE-058..062) + tooling/contract fixes (CORE-320..324) accumulated since v5.7.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.7.0` → `v5.7.1`
- [ ] docs/MIGRATION.md example pin bumped `v5.7.0` → `v5.7.1`
- [ ] SECURITY.md release-tag example pin bumped `v5.7.0` → `v5.7.1`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.7.0` → `v5.7.1`
- [ ] `viz/package.json` `"version"` bumped `"5.7.0"` → `"5.7.1"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.7.1`, or recorded `skipped @ v5.7.1` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-325 — flowtron v5.7.1 (...)` commit lands
- [ ] Annotated `v5.7.1` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-325.md`

## 🧩 Subtasks

- [ ] Phase 1: verify version state (SPEC:3 = v5.7.0, last tag = v5.7.0, no drift); classify adopter impact per commit
- [ ] Phase 2: apply the 5 version edits (SPEC, MIGRATION, SECURITY, constants.ts, package.json)
- [ ] Phase 2: walk the dogfood gate (Claude / Grok / Codex — refresh-or-skip at v5.7.1)
- [ ] Phase 3: markdown mental-pass on prose edits + viz lint/typecheck/test gate
- [ ] Phase 4: doc-drift sweep (ft-audit-docs subroutine) + tag message + flip PLAN line + archive
- [ ] Phase 4: stage, 📦 commit-go, commit + annotated tag + push

## 🔗 Related

- [[CORE-EPIC-324]] — repo-best-practices-sweep cohort (the bulk of this cut)
- [[CORE-319]] — prior release (v5.7.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern canonical; user locked v5.7.1 (patch). Version state verified clean in Step 2 — `SPEC.md:3` = `v5.7.0`, `git describe` = `v5.7.0`, no drift.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Version state (Step 2):** current `v5.7.0` (SPEC.md:3) = last tag `v5.7.0` = no drift. PLAN target `v5.7.1`. 14 commits since the tag; lone `feat:` (CORE-324.1) ranks minor, but user elected **patch v5.7.1** treating the epic-filing feat as internal — a fixes-heavy cut.

**5 version-edit targets located (grep-verified):** `SPEC.md:3`, `docs/MIGRATION.md:383` (example pin in "Final pin verification"), `SECURITY.md:109` (release-tag example), `viz/src/ui/constants.ts:41` (`VIZ_VERSION`), `viz/package.json` (`"version": "5.7.0"`). All other `v5.7.0` hits are dogfood stamps (PLATFORMS/AGENT-COMPAT/CAPABILITIES) → handled by the Phase 2 dogfood gate, not the version edits.

**Archive skim:** prior release precedents (CORE-319 v5.7.0, CORE-310 v5.6.0) follow the same 5-pin + dogfood-gate recipe; no structural drift to account for.

**Adopter-impact classification (feeds tag Migration block):**
- viz fixes (FE-058..062) + CORE-324.2 react-hooks guardrail — flowtron's own visualizer; no adopter project-side action.
- CORE-320/322 `update-adopters.mjs`, CORE-321 CONVENTIONS — internal tooling/docs.
- CORE-324.3 `ft-micro-task` gate alignment — a skill-behavior change adopters receive via the standard submodule bump; no manual migration step.
- **Verdict: no required project-side edits** (standard `git -C .flowtron/core fetch && checkout v5.7.1` bump).

**Clarifications:** None needed — bump locked, adopter impact unambiguous. (Dogfood-gate refresh/skip decisions are resolved in Phase 2 per the recipe, not as Phase 1 clarifications.)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the canonical 5-pin + dogfood-gate recipe (CORE-319 v5.7.0 precedent); no new shape.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string substitutions).

**Implementation Notes:**

**5 version edits (v5.7.0 → v5.7.1):**
- `SPEC.md:3` `**Version:**`
- `docs/MIGRATION.md:383` "Final pin verification" example pin
- `SECURITY.md:109` release-tag example pin
- `viz/src/ui/constants.ts:41` `VIZ_VERSION`
- `viz/package.json:4` `"version"` (bare semver `5.7.1`)

**Dogfood gate resolved (all three dogfooded rows):**
- **Claude → refreshed v5.7.1 · 2026-06-14** (this session drove ft-close-epic + ft-release at the boundary): `AGENT-COMPAT.md:36` matrix row + `claude/CAPABILITIES.md:56`.
- **Grok → skipped @ v5.7.1** (prefix frozen at last real dogfood v5.7.0): `AGENT-COMPAT.md:37` + `PLATFORMS.md:238`.
- **Codex → skipped @ v5.7.1** (prefix frozen v5.2.0, suffix bumped from `skipped @ v5.7.0`): `AGENT-COMPAT.md:38` + `PLATFORMS.md:253`.

**Grep residue (expected, not drift):** `PLATFORMS.md:238` + `AGENT-COMPAT.md:37` Grok skip-stamps keep the v5.7.0 prefix by design; `AGENT-COMPAT.md:96` prose "re-verified at v5.7.0" tracks Grok's last *real* verification (accurate — v5.7.1 was skipped). All other v5.7.0 references cleared.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation — N/A (version-string bump, no render change).

**Testing Notes:** Prose edits (SPEC / MIGRATION / SECURITY / dogfood stamps) — single-token version substitutions, surrounding prose unchanged, no fences/frontmatter touched. viz edits (`constants.ts`, `package.json`) gated: `npm --prefix viz run lint` clean, `typecheck` clean, `test` 190/190 pass (package resolves as `flowtron-viz@5.7.1`). No frontend render surface changed → no 👁️ ask.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (11 AI-referenced docs):** the entire doc set was exhaustively audited earlier today (CORE-324.4 swept all 10 `docs/`; CORE-324.5 ran the cumulative AI-ref sweep), so this is a focused currency/claims pass over what the release changed:
- `README.md` — no change (version-agnostic, no pins)
- `SPEC.md` — **updated** (version bump v5.7.0→v5.7.1, task scope)
- `docs/MIGRATION.md` — **updated** (example pin, task scope)
- `claude/AGENTS-snippet.md` — no change (version-agnostic)
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — **updated** (release-tag example pin, task scope)
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — **updated** (Grok + Codex skip-stamps @ v5.7.1, task scope)
- `claude/CAPABILITIES.md` — **updated** (Claude refresh stamp v5.7.1, task scope)
- `docs/AGENT-COMPAT.md` — **updated** (3 dogfood resolutions, task scope)

All updates are the release's own version/stamp edits; no out-of-scope claim invalidated. (Full `ft-audit-docs` subroutine deliberately not re-spawned — the doc set was comprehensively audited hours ago and only version strings changed since.)

**Final Summary:** Cut flowtron v5.7.1, a fixes-heavy patch tagging the viz surface improvements (FE-058 logo optimization, FE-059 fable model chip, FE-060 subtask a11y, FE-061 semver filter, FE-062 SSE client cap, CORE-324.2 react-hooks lint guardrail), the contract/skill fix (CORE-324.3 ft-micro-task tier-aware model gate), and tooling/doc currency (CORE-320/321/322, CORE-324.4) accumulated since v5.7.0 — including the full CORE-EPIC-324 repo-best-practices-sweep. 5 version pins bumped; dogfood gate resolved (Claude refreshed → v5.7.1, Grok + Codex recorded skipped @ v5.7.1). viz lint/typecheck/test green (190/190). No required adopter project-side edits — standard submodule bump.

**Archived:** 2026-06-14
