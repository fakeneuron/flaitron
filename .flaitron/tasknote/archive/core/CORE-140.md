---
title: adopter-docs-tilde-code-assumption
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-132]
---

# CORE-140 | adopter-docs-tilde-code-assumption

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-132]]

## 🎯 Goal

Soften the hardcoded `~/code/` workspace assumption in README.md and docs/MIGRATION.md so adopters understand flowtron works anywhere on their local machine.

## ✅ Acceptance

- [ ] README.md:29 no longer prescribes `~/code/` as a requirement
- [ ] docs/MIGRATION.md:10 no longer prescribes `~/code/` as a requirement
- [ ] docs/MIGRATION.md:25 no longer prescribes `~/code/flowtron/` as a requirement
- [ ] All rewrites preserve the original meaning; only the location assumption is softened

## 🧩 Subtasks

- [ ] Read current wording at all three locations
- [ ] Draft softened wording ("anywhere on your local machine" or equivalent)
- [ ] Apply edits to README.md:29 and docs/MIGRATION.md:10,25
- [ ] Doc-drift sweep and closure

## 🔗 Related

- [[CORE-132]] — source audit that surfaced this as Finding #5.1 (Low), 2026-05-22

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three cited locations confirmed present and match task description exactly.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- CORE-132.md: source audit; Finding 5.1 (Low) identified these three locations and deferred the fix here. No prior fix attempts.
- Drift check: all three cited line numbers confirmed — README.md:29, MIGRATION.md:10, MIGRATION.md:25.
- Shell command examples using `~/code/` as path placeholders (lines 19, 38-39, 317-318 in MIGRATION.md; line 48 in README.md) are not in scope — they're examples, not prescriptive requirements.
- README.md:53-57 already has the `FLOWTRON_VIZ_WORKSPACE` escape hatch; fine as-is.
- No clarifications needed. Explicit assumptions: only the three specifically cited locations are softened.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: same inline text replacement approach used by CORE-133–CORE-136 series (recent commits).
- README.md:29 — `"a fresh \`~/code/\` repo"` → `"your project's root directory"`
- MIGRATION.md:10 — dropped the `~/code/` prerequisite; rewrote as `"has its own git repo and already has a \`CLAUDE.md\` — the project can live anywhere on your local machine."`
- MIGRATION.md:25 — `"after cloning flowtron to \`~/code/flowtron/\`"` → `"after cloning flowtron anywhere on your local machine"`
- No tests warranted for prose-only changes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure markdown prose edits; no test suite or lint tooling applies. No frontend surfaces affected.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep: README.md and docs/MIGRATION.md updated by this task; all other AI-referenced docs unchanged.

Softened hardcoded `~/code/` workspace assumption at three adopter-facing prose locations (README.md:29, MIGRATION.md:10, MIGRATION.md:25). Changed lines: README.md:1, MIGRATION.md:2. No code changes; pure prose edits.

**Archived:** 2026-05-23
