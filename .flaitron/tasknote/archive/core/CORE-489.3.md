---
title: sweep-coverage-gaps
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-489, CORE-489.2, CORE-397]
touches:
  - .flowtron/tasknote/README.md
  - AGENTS.md
---

# CORE-489.3 | sweep-coverage-gaps

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-489]]

## 🎯 Goal

Close the two doc-drift-sweep coverage gaps the v5.21.0 rollout exposed: add `docs/VISION.md` (naming its own mirrors — SPEC.md §"What flowtron does NOT provide", `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`) to `.flowtron/tasknote/README.md` §"AI-referenced docs", and append `SPEC/procedures/` to the `SPEC/` bullet in `AGENTS.md` §"Repo Layout".

## ✅ Acceptance

- [x] `.flowtron/tasknote/README.md` §"AI-referenced docs" lists `docs/VISION.md` with a one-line purpose naming its mirrors (SPEC.md §"What flowtron does NOT provide", `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`)
- [x] `AGENTS.md` §"Repo Layout" `SPEC/` bullet mentions `SPEC/procedures/` alongside the other lazy modules
- [x] No unrelated entries in either list reordered or reworded — `git diff` confirms single-hunk insertions only

## 🧩 Subtasks

- [x] Add a `docs/VISION.md` bullet to `.flowtron/tasknote/README.md` §"AI-referenced docs", following the existing one-line-purpose style and naming its mirrors
- [x] Extend the `SPEC/` bullet in `AGENTS.md` §"Repo Layout" to mention `SPEC/procedures/`
- [x] Phase 3: markdown mental-pass + CI drift greps run locally

## 🔗 Related

- [[CORE-EPIC-489]] — parent epic (tier-mirror-and-sweep-coverage)
- [[CORE-489.2]] — sibling child; its Discovery Notes explicitly scoped this coverage-gap pair out to CORE-489.3 (predecessor)
- [[CORE-397]] — introduced `SPEC/procedures/` without adding it to `AGENTS.md` §"Repo Layout" (root cause)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are verifiably real and unchanged since filing. `docs/VISION.md` exists (created by earlier work) but is absent from `.flowtron/tasknote/README.md` §"AI-referenced docs"' 17-entry list. `SPEC/procedures/` exists (`ft-task.md`, `README.md`) but `AGENTS.md` §"Repo Layout"'s `SPEC/` bullet lists only "epics, starter tasks, blocked tasks, model routing, gates, versioning, tasknote selection, and loop tasks" — no `procedures`. Both are prose-only, two-file, bounded fixes with no design surface.

- [x] Read relevant source files — `.flowtron/tasknote/README.md` §"AI-referenced docs" (:34-58), `AGENTS.md` §"Repo Layout" (:24-39), `docs/VISION.md` (mirror-pointer paragraph, :30-32), `SPEC/epic.md` (audit-acceptance doc-drift line), `SPEC/procedures/` directory listing. Probe not warranted — read set was small and known.

- [x] **Best Practices Review** — N/A for module boundaries (markdown prose only). The relevant discipline is matching each list's existing entry style: `.flowtron/tasknote/README.md`'s entries are "`path` — one-line purpose"; `AGENTS.md`'s `SPEC/` bullet is a prose sentence naming module topics, not a per-file list — the addition should extend that sentence, not restructure it into a list.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/*.md` for `VISION.md` and `Repo Layout`/`SPEC/procedures`. VISION.md hits: CORE-489.2, CORE-463.1, CORE-463.3, CORE-473.{1,2,5,6}, CORE-486, CORE-EPIC-194, CORE-487 — none touch the README list itself. Repo Layout hits: CORE-443, CORE-445.3, CORE-473.5, CORE-446, CORE-482.3/.4, CORE-489.2, CORE-480, CORE-484, CORE-EPIC-342 — general repo-layout mentions, none add `SPEC/procedures/`. Root-cause hit: **CORE-397** introduced `SPEC/procedures/README.md` + `ft-task.md` and swept the doc-drift list carefully (per its own Phase 4 verdicts) but never touched `AGENTS.md` §"Repo Layout", since that file isn't on the AI-referenced-docs sweep list — a related but distinct gap. Load-bearing: confirms both gaps are genuine misses, not already-fixed drift.

- [x] **Drift check** — task description's two file/anchor citations verified against current code: `.flowtron/tasknote/README.md` §"AI-referenced docs" is at :34-58 as described, 17 entries, `docs/VISION.md` absent. `AGENTS.md` §"Repo Layout" `SPEC/` bullet is at :27-28, lists seven module topics, no `procedures`. `docs/VISION.md`'s mirror-pointer paragraph (:30-32) confirms the three mirrors named in the PLAN.md description (SPEC.md §"What flowtron does NOT provide", `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`) are accurate. No contradiction with any SPEC contract; plan matches the PLAN.md line exactly. [[CORE-489.2]]'s own Discovery Notes independently confirm this exact scope split ("Scope boundary" + "Deliberately not touched" sections), corroborating rather than contradicting.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. `docs/VISION.md`'s one-line purpose in the new README entry should name its three mirrors (as the PLAN.md line specifies), matching how `docs/EXTERNAL-AGENTS.md`'s own entry already names cross-referencing surfaces — consistent house style for docs with a "canonical + mirrors" relationship.
  2. `AGENTS.md`'s `SPEC/` bullet is a prose list of module *topics*, not file paths — appending "procedure SOPs" (or equivalent) to the existing comma sequence is the minimal, style-consistent edit, not converting it to a bulleted sub-list.
  3. Alphabetical/insertion position for the new README entry: append at the end of the flat list (matching how `docs/WORKTREES.md`, the most recent addition, was appended last rather than resorted in) — no existing ordering scheme (not alphabetical, not by category) to preserve.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Both gaps are exactly as scoped by [[CORE-489.2]]'s Discovery Notes ("Scope boundary" section): "the sibling coverage-gap fixes (VISION.md into the AI-referenced docs sweep list, `SPEC/procedures/` into AGENTS Repo Layout) belong to [[CORE-489.3]]". No re-interpretation needed — the PLAN.md description, this archive cross-reference, and direct inspection of both target files all agree.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established shape rather than inventing one. The README addition follows the existing "`path` — one-line purpose" style and is appended last, matching `docs/WORKTREES.md`'s precedent as the most recent addition (no alphabetical/categorical order to preserve). The AGENTS.md edit extends the existing prose sentence with one more comma-joined module topic rather than restructuring the bullet into a sub-list.

- [x] **Minimal refactor gate** — no refactor. Two surgical additions; every changed line traces to an Acceptance criterion. No adjacent staleness found in either list during Discovery.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose only, no code path changed. The repo's guard for these surfaces is the CI `drift` job, run locally in Phase 3.

**Implementation Notes:**

Two edits, +2/−0 across two files:

1. **`.flowtron/tasknote/README.md:59`** (+1) — appended a `docs/VISION.md` bullet to §"AI-referenced docs", naming its three mirrors (SPEC.md §"What flowtron does NOT provide", `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`) per the PLAN.md line and `docs/VISION.md`'s own mirror-pointer paragraph (:30-32). Closes the gap where the doc-drift sweep (Phase 4 + epic audits) never walked flowtron's own canonical scope-boundary statement.

2. **`AGENTS.md:27-29`** (+1/-1, rewrapped) — extended the `SPEC/` bullet's topic list from "...versioning, tasknote selection, and loop tasks." to "...versioning, tasknote selection, loop tasks, and `SPEC/procedures/` agent-neutral SOPs." [[CORE-397]] created the `SPEC/procedures/` directory without this update, since `AGENTS.md` isn't itself on the AI-referenced-docs sweep list that would have caught the omission — this task closes that miss directly.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed. Substituted the equivalent guard for these surfaces, the CI `drift` job's checks that could plausibly touch either file, run locally (below).

- [x] Ran lint/type-check on changed code — `N/A` (markdown). Relevant CI `drift` checks run locally: wrapper-name invariant **OK**, shipped-skill parity (claude ↔ codex) **OK**, Pair A templates-roster clause **OK**. No drift check gates the "AI-referenced docs" list content or the `AGENTS.md` "Repo Layout" bullet directly (confirmed by grep — zero hits), so the remaining checks are unaffected by these edits.

- [x] **Quality assertions** — no duplication introduced: the README entry follows the existing "`path` — one-line purpose" style; the AGENTS.md edit extends an existing sentence rather than adding new structure. `git diff` reviewed line-by-line: two clean, minimal insertions, no adjacent lines disturbed. No public surface grew; no code-facing docs went stale.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface; `viz/` untouched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Verification was documentation-appropriate rather than test-suite-based:

- **`git diff` review** — both edits are clean, minimal, single-hunk insertions; no reflow or reordering of surrounding content.
- **Targeted CI `drift` checks, locally** — wrapper-name invariant, shipped-skill parity, and Pair A roster clause all green; these are the checks in `.github/workflows/ci.yml`'s `drift` job that inspect `README.md`/`AGENTS.md`/`SKILL.md` content generally.
- **Direct grep** — confirmed no CI drift check references "AI-referenced docs" or "Repo Layout" by name, so the edited sections themselves carry no automated gate beyond the doc-drift sweep this task itself performs.
- **Presence check** — `docs/VISION.md` now appears 1× in `.flowtron/tasknote/README.md` §"AI-referenced docs" (was 0); `SPEC/procedures/` now appears 1× in `AGENTS.md` §"Repo Layout" (was 0).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, epic child kept nested beneath its active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Doc-drift sweep verdicts** — 18 AI-referenced entries (was 17; this task adds the 18th): `.flowtron/tasknote/README.md` — **updated** (added the `docs/VISION.md` entry — the task's own deliverable); `AGENTS.md` — **updated** (added `SPEC/procedures/` to the `SPEC/` bullet — the task's other deliverable); `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — **no change** (16 entries; none reference either edited section, and `docs/VISION.md` itself was only cited, not touched).

**Final Summary:**

Closed both doc-drift-sweep coverage gaps [[CORE-489.2]]'s Discovery Notes scoped out to this task. `docs/VISION.md` — flowtron's own canonical scope-boundary statement — existed but was absent from `.flowtron/tasknote/README.md` §"AI-referenced docs", so it never got walked by the Phase 4 closure sweep or an epic-audit's doc-drift check; added as an 18th entry naming its three mirrors (SPEC.md §"What flowtron does NOT provide", `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`), verified against the file's own mirror-pointer paragraph. Separately, [[CORE-397]] created `SPEC/procedures/` (`ft-task.md`, `README.md`) without updating `AGENTS.md` §"Repo Layout"'s `SPEC/` bullet — a miss `AGENTS.md`'s own sweep entry couldn't have caught, since `SPEC/procedures/` sits below the granularity the doc-drift sweep tracks; extended the existing prose sentence to name it. Two edits, +2/−0 (one rewrapped line) across two files — both single-hunk, no adjacent content disturbed. Verification: relevant CI `drift` checks (wrapper-name invariant, shipped-skill parity, Pair A roster clause) run locally, all green; confirmed by grep that no CI drift check gates either edited section directly, so the remaining checks are structurally unaffected. Docs verdict: 2 of 18 AI-referenced entries updated (the task's own two deliverables), 16 no change. Maintainability effect: an AI session cold-starting from `AGENTS.md` now sees `SPEC/procedures/` in the repo map instead of discovering it only by directory listing, and flowtron's own doc-drift sweep now walks its own scope-boundary document instead of silently exempting it.

**Archived:** 2026-08-29
