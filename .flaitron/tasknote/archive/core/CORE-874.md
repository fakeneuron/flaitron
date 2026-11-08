---
title: audit-overlay-refresh
status: completed
tags: []
created: 2026-11-07
due:
related-tasks: [CORE-888]
touches:
  - .flaitron/audit-overlay/SKILL.md
---

# CORE-874 | audit-overlay-refresh

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-888]]

## 🎯 Goal

Refresh flaitron-self's `/audit` overlay so its scope globs, security rubric, gates, and doc counts cover `install.sh`, `tools/install.test.sh`, and the CI workflows, and its `flaitron-reconciled:` pin reads v8.3.0.

## ✅ Acceptance

- [x] Unkeyed and `security:` scope globs name `install.sh`, `tools/install.test.sh`, `.github/workflows/*.yml`; "the only code surfaces" is gone — `grep -q 'install.sh' … && grep -q '.github/workflows/\*.yml' … && ! grep -q 'the only code surfaces' .flaitron/audit-overlay/SKILL.md`
- [x] `security:` rubric cites `SECURITY.md` §"One-line installer" and §"GitHub Actions CI" — `grep -q 'One-line installer' … && grep -q 'GitHub Actions CI' .flaitron/audit-overlay/SKILL.md`
- [x] `security:` gates include the shellcheck command — `grep -q 'shellcheck -s sh install.sh tools/install.test.sh' .flaitron/audit-overlay/SKILL.md`
- [x] Unkeyed gates list the three missing `validate` commands (`npm --prefix viz run build`, two `node --check tools/update-adopters*.mjs`) — `grep -q 'node --check tools/update-adopters.mjs' … && grep -q 'npm --prefix viz run build' .flaitron/audit-overlay/SKILL.md`
- [x] `docs:` scope counts refreshed to measured values (129 docs files; 1,311 of 1,441 tracked markdown files archived tasknotes, counted with this note archived) — `grep -q '129 files at v8.3.0' … && grep -q '1,311 of the repo' .flaitron/audit-overlay/SKILL.md`
- [x] `flaitron-reconciled:` is v8.3.0, justified by `git diff v7.5.0..HEAD -- claude/skills/ft-audit` showing no delta change — `grep -q '^flaitron-reconciled: v8.3.0$' .flaitron/audit-overlay/SKILL.md`; the no-delta-change reading is `judgment` (read the diff; recorded in Discovery Notes)
- [x] Repo drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Read the diff `v7.5.0..HEAD -- claude/skills/ft-audit` and confirm no delta-affecting change
- [x] Edit unkeyed + `security:` scope globs
- [x] Add `security:` rubric sections and shellcheck gate
- [x] Extend unkeyed gates with the three missing `validate` commands
- [x] Refresh `docs:` counts
- [x] Bump `flaitron-reconciled:` to v8.3.0
- [x] Run drift checks and the acceptance greps

## 🔗 Related

- [[CORE-888]] — follow-up filed by the External review (Sacred invariants for the installer and CI surfaces; install e2e gate).
- Surfaced by audit-docs 2026-11-07 (Findings #3, #16, High).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The overlay still reads v7.5.0, names no installer or workflow surface, and lists five of eight `validate` commands; all gaps confirmed against the tree today.

- [x] Read relevant source files — `.flaitron/audit-overlay/SKILL.md`, `.github/workflows/ci.yml` + `install-test.yml`, `justfile`, `SECURITY.md` headings, `tools/drift-checks.sh` line 381.

- [x] **Best Practices Review** — N/A: one markdown overlay; no code or module boundary.

- [x] **Archive skim** — `grep -l 'audit-overlay\|audit overlay' archive/core/` returns ~20 notes (CORE-287–289, 300, 309, 330.3, 349.x, 368, 389.x, 408.x, 420.2, 422, 426, …), all about creating or reconciling the overlay and its deltas; none records a decision against the changes here. Area `core` confirmed against the README table (`CORE-*` → `archive/core/`).

- [x] **Drift check** — PLAN line matches the tree: overlay pin v7.5.0, scope glob line says "the only code surfaces", `docs:` says 128 files / 1,188 of 1,317. SPEC contract read (overlay is a thin delta file; pass files resolve its slots).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- No clarifications needed (--fast). Assumptions: "three missing validate commands" are `npm --prefix viz run build`, `node --check tools/update-adopters.test.mjs`, `node --check tools/update-adopters.mjs` (the overlay listed lint, typecheck, test, both `node --test` suites; `validate` runs eight). I list them rather than subset.
- `git diff v7.5.0..HEAD -- claude/skills/ft-audit` touches three files: `SKILL.md` (trivial-fix carve-out threshold ~10 → ~25 lines), `passes/context.md` and `scaffold-bootstrap.md` (the word "flaitron" lower-cased, and the self-mode heading string). None changes a placeholder slot or the dispatcher's resolution steps, so no delta needs reconciling and the pin may move to v8.3.0.
- Measured counts at v8.3.0: `git ls-files '*.md'` minus the two write-once archives = 129; total tracked markdown 1,440, of which 1,310 are archived tasknotes. Date stamp 2026-11-07.
- `tools/drift-checks.sh:381` checks the overlay's `SKILL.md` frontmatter; the drift run in Phase 3 covers it.
- Size estimate: ~12 lines (rename-aware).
- Phase 1 judgment: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the overlay's existing delta bullets in place (unkeyed value + keyed `security:` sub-bullet); no new shape.

- [x] **Minimal refactor gate** — no refactor; the edits are the Acceptance list only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose overlay; `tools/drift-checks.sh` (line 381) already checks its frontmatter.

**Implementation Notes:**

Seven edits to `.flaitron/audit-overlay/SKILL.md` (pin, unkeyed scope, `docs:` counts ×2, `security:` scope, `security:` rubric, unkeyed gates, `security:` gates). External review follow-ups applied: "everything else is markdown" → "the rest is markdown plus config"; dropped the hard-coded "eight commands" so the gate line cannot drift against a ninth `validate` step; archived-count figures set to the post-closure values (1,311 of 1,441) so they are true at the closure commit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for code (markdown only); full validation set run per `--unattended`.

- [x] Ran lint/type-check on changed code — covered by `just check` (viz lint + typecheck).

- [x] **Verification receipt** — see Testing Notes; no duplication, dead code, or stale docs introduced.

- [x] **External review** — `/code-review medium` over the working-tree diff of the overlay; six notes, no blocker; dispositions in Testing Notes.

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
just check                                                            → 0   (viz test/typecheck/lint/build, 3 tools commands, drift-checks.test.mjs, tools/drift-checks.sh; run twice, before and after review fixes)
shellcheck -s sh install.sh tools/install.test.sh                     → 0
grep scope (install.sh, workflows/*.yml, no "only code surfaces")     → 0
grep rubric (One-line installer, GitHub Actions CI)                   → 0
grep shellcheck gate                                                  → 0
grep gates (node --check …update-adopters.mjs, viz run build)         → 0
grep counts (129 files at v8.3.0, 1,311 of the repo)                  → 0
grep pin (^flaitron-reconciled: v8.3.0$)                              → 0
```

Scope guardrail: diff paths are the overlay, this note, and PLAN.md only; ~14 changed overlay lines, under the 400 cap.

External review dispositions (all notes):

1. "everything else is markdown" false — **fixed** (reworded).
2. Counts stale once this note is tracked — **fixed** (figures set to the post-archive values 129 / 1,311 of 1,441).
3. `security:` gate omits the installer e2e test — **filed** as [[CORE-888]] (needs network; separate workflow `install-test.yml`).
4. Sacred invariants not extended to installer and CI — **filed** as [[CORE-888]].
5. Keyed `performance:` / `frontend:` slots ignore the new surfaces — **declined, deliberate**: those domains' scopes are narrower by design (`viz/src/ui/**`, chunk table); installer and CI are not in their remit.
6. Unkeyed gates duplicate `frontend:` gates, hard-coded "eight commands" — **fixed** (count dropped). The duplication is the existing unkeyed-vs-keyed shape, left as is.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — AI-referenced docs: no change needed; the overlay is not in the list, and no listed doc cites the figures edited here. `docs/CONTEXT-BUDGET.md` byte budgets unaffected (`drift-checks.sh` context_budget passed).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — N/A.

**Final Summary:**

The audit overlay now covers the installer and CI workflows, grades the security pass against the two new `SECURITY.md` sections, runs shellcheck as a security gate, lists the full `validate` roster, and carries current doc counts and a v8.3.0 pin. Changed: `.flaitron/audit-overlay/SKILL.md` (+7/−7). Declared 1 file, changed 1 (plus this note and PLAN.md, excluded). `just check` → 0; shellcheck → 0; all acceptance greps → 0. Doc verdict: no change. Follow-up [[CORE-888]] filed (commit a81161e6). unattended-candidates: none (filing run via the review-note path, not `/ft-file-task`'s closure hook; CORE-888 is `[light]` markdown-only and a candidate an operator may mark).

**Archived:** 2026-11-07
