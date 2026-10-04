---
title: audit-in-ci-or-cadence
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-575, CORE-575.2, CORE-575.3]
touches:
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-575.4 | audit-in-ci-or-cadence

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-575]]

## 🎯 Goal

Decide whether `npm --prefix viz audit --audit-level=high` becomes a `validate`-job CI step or a documented manual cadence, then implement that choice so the epic's "make audit a signal again" goal has a durable home.

## ✅ Acceptance

- [x] Decision recorded and documented in `docs/CONVENTIONS.md` — `grep -n "Dependency audit cadence" docs/CONVENTIONS.md` → line 62
- [x] `/ft-release` wired to run the audit every cut — `grep -n "6.2 — Dependency audit" claude/skills/ft-release/SKILL.md` → line 234
- [x] AGENTS.md §"Validation" / CI `validate` job byte-for-byte roster (§7.1 Pair H) left untouched — `judgment`: confirmed via `git diff --stat AGENTS.md .github/workflows/ci.yml` → empty; the CI-gate option was declined outright rather than half-wired
- [x] Full validation gates still pass — `npm --prefix viz test` → 531/531, `npm --prefix viz run typecheck` → 0, `npm --prefix viz run lint` → 0

## 🧩 Subtasks

- [x] Decide: CI `validate` step vs documented manual cadence
- [x] If cadence: add a "Dependency audit cadence" subsection to `docs/CONVENTIONS.md` recording the decision and why
- [x] Wire the chosen cadence into `/ft-release` SKILL.md (new §6.2, after the existing §6.1 CI-status check)
- [x] Run the standing validation gates to confirm nothing else regressed

## 🔗 Related

- [[CORE-EPIC-575]] — parent epic (viz-dependency-posture)
- [[CORE-575.2]] — predecessor (npm-audit-fix-in-range)
- [[CORE-575.3]] — predecessor (gray-matter-js-yaml-residue)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The epic's remaining goal — a durable home for the audit signal — is unaddressed by CORE-575.2/.3, which only cleared the existing advisories. This task's framing (CI step vs documented cadence) still matches current repo state; nothing has changed since epic Discovery.

- [x] Read relevant source files — `.github/workflows/ci.yml` (`validate` + `drift` jobs), `AGENTS.md` §"Validation", `docs/CONVENTIONS.md` §"GitHub Actions CI", `claude/skills/ft-release/SKILL.md` Step 6/6.1, `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair H (the byte-for-byte binding named in the PLAN.md line)

- [x] **Best Practices Review** — this is a process/doc decision, not a module-boundary change; the relevant "existing pattern" is how the repo already handles a release-cadence check that shouldn't gate every push: `/ft-release` §6.1 (CI status) runs once per cut and is documented inline rather than folded into the byte-for-byte `validate` roster. Followed that shape for consistency (a new `§6.2`) rather than inventing a different mechanism.

- [x] **Archive skim** — `archive/core/CORE-575.2.md` and `CORE-575.3.md` (this epic's predecessors) cover clearing existing advisories, not the CI-vs-cadence question; no prior tasknote addresses where `npm audit` should live going forward. No other archived tasknote references Pair H or the `validate`/`drift` job split in a way that bears on this decision.

- [x] **Drift check** — PLAN.md line's two options (CI `validate` step vs `docs/CONVENTIONS.md` cadence) still match the current CI/docs state; no drift. Confirmed the exact mechanics of "Pair H's byte-for-byte binding" the line calls out: `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair H diffs `AGENTS.md` §"Validation" against `.github/workflows/ci.yml`'s `validate`-job `- run:` lines byte-for-byte (via `diff`), and separately checks presence of the same 6 commands across `.github/workflows/ci.yml`, `docs/CONVENTIONS.md`, `.flowtron/tasknote/README.md`, and `/ft-release` SKILL.md's Step 6 fence. Adding `npm audit` to the `validate` job would require adding it to *all five* of those surfaces to keep Pair H green — real but mechanical cost, not itself a reason to prefer the cadence option.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: the deciding factor is which option best serves the epic's actual goal ("make `npm audit` a signal again") without introducing a new failure mode into the `validate` gate.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

Decision: **documented manual cadence, wired into `/ft-release` §6.2** — not a CI `validate` step.

Reasoning: `npm --prefix viz test`, `run typecheck`, and `run lint` are pure functions of the code at a given commit — the same commit always passes or fails them identically, which is exactly what Pair H's byte-for-byte binding to `AGENTS.md` §"Validation" is built to protect (a deterministic "passing" definition, verbatim on both the human-run and CI-run sides). `npm audit`'s result additionally depends on the public advisory database's state *at the moment it runs* — a commit that passes audit today can fail it tomorrow with zero code change of its own, for a dependency nobody touched in that push. Folding that into the `validate` gate would make unrelated future pushes red for reasons outside the pushed diff, which is the same class of self-inflicted CI-badge failure `docs/CONVENTIONS.md` already documents as a cautionary precedent (`CORE-546`, a `drift`-job miss that reddened CI for an entire release cut) — just triggered externally instead of by a repair that missed a mirror.

`docs/CONVENTIONS.md` §"GitHub Actions CI" already establishes the precedent for this split: the `drift` job explicitly keeps release-context/human-judgment checks (Pairs D, F, G, H, I, K) out of per-push CI and defers them to `/ft-release` §7.1, "checks that need release context or human judgment... stay there and are not duplicated" in CI. `npm audit`'s time-dependence is a variant of the same problem — not judgment, but non-determinism against the commit alone — so the same "route it to the release cut, not every push" answer applies. `/ft-release` already runs a per-cut, non-`validate`-roster check with exactly this shape at §6.1 (CI status, "flag-don't-block" against a **fixed commit**), so a sibling §6.2 for the audit follows an established pattern rather than inventing a new one.

Given flowtron cuts releases frequently (PLAN.md `## Completed` history shows multiple per week), the staleness window between a per-cut audit and a true "no gate at all" is small — the epic's "make audit a signal again" goal is met without wiring external-database noise into the deterministic correctness gate every commit must clear. This also keeps the change footprint to two files (`docs/CONVENTIONS.md`, `claude/skills/ft-release/SKILL.md`) instead of the five Pair H would require for a `validate`-step wiring, appropriate for a `[light]` task.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending `/ft-release`'s existing §6.1 pattern (a per-cut, non-`validate`-roster check with a documented rationale) for §6.2; no new shape invented

- [x] **Minimal refactor gate** — no refactor; two additive doc sections

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code behavior changed

**Implementation Notes:** Added `docs/CONVENTIONS.md` §"Dependency audit cadence" (canonical decision + rationale, inserted after §"GitHub Actions CI") and `claude/skills/ft-release/SKILL.md` §6.2 "Dependency audit (release cadence)" (labeled mirror naming the canonical section, per `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors"), placed after the existing §6.1 CI-status check. Neither `AGENTS.md` §"Validation" nor `.github/workflows/ci.yml` was touched — confirmed via `git diff --stat` showing no changes to either — so §7.1 Pair H's byte-for-byte binding is unaffected.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, doc-only change; ran the full standing gate anyway for confidence (see Testing Notes)

- [x] Ran lint/type-check on changed code — N/A, no code changed; `npm --prefix viz run typecheck` / `run lint` re-run anyway as a sanity check

- [x] **Verification receipt** — see Testing Notes below; no duplication/dead-code/doc-drift introduced (two additive sections, each naming the other per the labeled-mirror convention)

- [x] N/A — doc/process change, no UI

**Testing Notes:**
- `grep -n "Dependency audit cadence" docs/CONVENTIONS.md` → 62 (found)
- `grep -n "6.2 — Dependency audit" claude/skills/ft-release/SKILL.md` → 234 (found)
- `git diff --stat AGENTS.md .github/workflows/ci.yml` → 0 (no output — confirms Pair H's byte-for-byte roster untouched)
- `npm --prefix viz test` → 0 (531/531 passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities — confirms the §6.2 command itself is currently clean)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs": `docs/CONVENTIONS.md` is the doc this task updated (the change itself, not drift to fix). `AGENTS.md` — deliberately left untouched, that's the decision; no change. `SECURITY.md` — checked for an existing dependency-advisory-acceptance section (CORE-575.3 already established there is none); this task introduces a cadence, not a specific advisory accept, so no change. `README.md`, `SPEC.md`, `docs/MIGRATION.md`, the three `AGENTS-snippet.md` adopter-wiring files, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md` — none mention CI validation composition or release cadence; no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form, kept nested under active parent `CORE-EPIC-575`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Decided `CORE-EPIC-575`'s "make `npm audit` a signal again" goal is best served by a documented release-cadence check rather than a `validate`-job CI step, and implemented it. `npm audit`'s result depends on the public advisory database's state at run time, not just the code — a commit that passes today can fail tomorrow untouched — which conflicts with the deterministic "passing" contract §7.1 Pair H enforces byte-for-byte between `AGENTS.md` §"Validation" and CI's `validate` job; folding audit into that gate would redden CI for unrelated future pushes, the same class of self-inflicted failure `docs/CONVENTIONS.md` already documents as a cautionary precedent (`CORE-546`). The repo already draws this exact line for the `drift` job (release-context checks stay in `/ft-release` §7.1, not per-push CI) and for `/ft-release` §6.1 (CI-status, a per-cut flag-don't-block check outside the `validate` roster) — a new §6.2 extends that established pattern rather than inventing one.

Changed: `docs/CONVENTIONS.md` (+1 section, "Dependency audit cadence", the canonical decision + rationale, inserted after §"GitHub Actions CI") and `claude/skills/ft-release/SKILL.md` (+1 section, §6.2 "Dependency audit (release cadence)", a labeled mirror per `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors", inserted after the existing §6.1). Confirmed `AGENTS.md` and `.github/workflows/ci.yml` are untouched (`git diff --stat` on both → empty), so §7.1 Pair H's byte-for-byte `validate`-roster binding is unaffected by this decision — the CI-step option was declined outright, not half-wired. `touches:` scope matches exactly.

Verification: `grep -n "Dependency audit cadence" docs/CONVENTIONS.md` → found (line 62); `grep -n "6.2 — Dependency audit" claude/skills/ft-release/SKILL.md` → found (line 234); `npm --prefix viz test` → 531/531 passed; `npm --prefix viz run typecheck` → 0; `npm --prefix viz run lint` → 0; `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (confirms the new §6.2 command is currently clean). No refactor needed; the two new sections name each other (canonical ↔ labeled mirror) so no doc drifted. Maintainability effect: the epic's audit signal now has a durable, low-friction home — checked every release cut instead of never, without adding a non-deterministic failure mode to the gate every commit must pass.

**Archived:** 2026-09-11
