---
title: overlay-installer-invariants
status: completed
tags: []
created: 2026-11-07
due:
related-tasks: [CORE-874]
touches:
  - .flaitron/audit-overlay/SKILL.md
---

# CORE-888 | overlay-installer-invariants

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-874]]

## 🎯 Goal

Extend flaitron-self's `/audit` overlay so its Sacred invariants (Critical) cover the `install.sh` `curl | sh` integrity checks and the CI workflows' `permissions:` and SHA pinning, and its `security:` gates run the installer's end-to-end test.

## ✅ Acceptance

- [x] Sacred invariants gain a fifth item naming the `install.sh` integrity checks (truncation-safe `main "$@"`, tag/commit cross-check with `FLAITRON_SHA`) — `grep -q 'FLAITRON_SHA' .flaitron/audit-overlay/SKILL.md && grep -q 'main "\$@"' .flaitron/audit-overlay/SKILL.md`
- [x] The same item names workflow `permissions:` and full-length-SHA action pinning, citing `SECURITY.md` §"GitHub Actions CI" — `grep -q 'full-length commit SHA' .flaitron/audit-overlay/SKILL.md`
- [x] Keyed Sacred-invariant lines that restate the range read `(1)–(5)` where their scope covers the new surfaces (`structure:`), and no line still claims `(1)–(4)` as the full set for such a domain — `judgment` (read the keyed lines; `frontend:` / `performance:` stay `(1)–(4)` by CORE-874's declined-by-design call)
- [x] `security:` gates include `sh tools/install.test.sh install.sh`, marked as needing network — `grep -q 'sh tools/install.test.sh install.sh' .flaitron/audit-overlay/SKILL.md`
- [x] The overlay still passes the drift checks — `bash tools/drift-checks.sh` exits 0
- [x] The added gate command itself passes on this tree — `sh tools/install.test.sh install.sh` exits 0

## 🧩 Subtasks

- [x] Add Sacred invariant (5) to the unkeyed **Sacred invariants → Critical** bullet
- [x] Update the `structure:` keyed line from `(1)–(4)` to `(1)–(5)`; leave `frontend:` / `performance:` at `(1)–(4)`
- [x] Add `sh tools/install.test.sh install.sh` (needs network) to the `security:` **Verification gates** line
- [x] Run the acceptance commands and record the receipt

## 🔗 Related

- [[CORE-874]] — predecessor; its External review filed this follow-up (installer/CI invariants, e2e gate).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Overlay has four Sacred invariants, none on the installer or CI, and its `security:` gate line carries shellcheck but not the e2e test; both gaps confirmed against the file today.

- [x] Read relevant source files — `.flaitron/audit-overlay/SKILL.md`, `SECURITY.md` §"One-line installer" + §"GitHub Actions CI", `.github/workflows/ci.yml` + `install-test.yml`, `install.sh` (`main "$@"` last line, `FLAITRON_SHA` check at lines ~402–406), `tools/drift-checks.sh:381`.

- [x] **Best Practices Review** — N/A: one markdown overlay; no code or module boundary.

- [x] **Archive skim** — `archive/core/` area confirmed against the README table (`CORE-*` → `archive/core/`). Hits on `audit-overlay` in CORE-802/825/854/855/865/869.4/869.N/874; CORE-874 is the load-bearing one: it filed this row (findings 3 and 4), and declined keyed `performance:` / `frontend:` coverage of the new surfaces as deliberate (finding 5). No note records a decision against this change.

- [x] **Drift check** — PLAN line matches the tree: Sacred invariants are (1)–(4) at overlay line 77; `security:` gates (line 74) list gitleaks, shellcheck, `npm audit` only; both workflows declare `permissions:` and SHA-pin `actions/checkout`/`setup-node` (ci.yml:12,23,28,78,99,102; install-test.yml:31,39,52). `SECURITY.md` §"One-line installer" and §"GitHub Actions CI" exist with the cited claims.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

No clarifications needed. Assumptions: (a) the new invariant is one item (5) covering both installer and CI surfaces, since the row asks for one extension of the Critical list; (b) keyed lines restating `(1)–(4)` follow their scope — `structure:` covers `install.sh` and workflows (every tracked file) so it moves to `(1)–(5)`, while `frontend:` / `performance:` keep `(1)–(4)` per CORE-874's declined-by-design finding; `docs:`/`security:` have no keyed Sacred line and inherit (5); (c) the invariant states the checks as the properties the installer and workflows have today (per `SECURITY.md`), and does not add new requirements such as `pull_request_target`.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Four edits to `.flaitron/audit-overlay/SKILL.md`, extending existing bullets in place (no new shape): Sacred invariant (5) appended to the unkeyed bullet; `structure:` keyed line `(1)–(4)` → `(1)–(5)`; `frontend:` / `performance:` lines annotated "not (5)" with the scope reason; e2e command added to the `security:` gates. Tests: N/A (prose overlay; `tools/drift-checks.sh:381` checks its frontmatter).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep FLAITRON_SHA && grep 'main "\$@"' overlay                        → 0
grep 'full-length commit SHA' overlay                                 → 0
grep 'sh tools/install.test.sh install.sh' overlay                    → 0
bash tools/drift-checks.sh                                            → 0   (run before and after review fixes)
sh tools/install.test.sh install.sh                                   → 0   (ALL PASS (sh); network)
```

Acceptance 3 (`judgment`): read the keyed lines — `structure:` `(1)–(5)`; `frontend:` / `performance:` `(1)–(4)` with the reason stated inline; `security:` / `docs:` inherit the unkeyed list.

Scope guardrail: one overlay file, 5 insertions / 5 deletions, plus this note and PLAN.md.

External review (`/code-review medium`, working-tree diff of the overlay): five notes, no blocker.

1. Network gate had no offline-skip rule — **fixed** ("an offline run skips it rather than reporting a finding").
2. Workflow half of (5) has no gate — **declined, deliberate**: no workflow linter is configured and `scaffold-bootstrap.md` §3 bars inventing one; the pass grades it on read-the-code evidence, like (1)–(3).
3. `frontend:` / `performance:` "(1)–(4) above" ambiguous — **fixed** (reason stated inline on each line).
4. SECURITY.md cites only checkout for SHA pinning — **declined**: §"GitHub Actions CI" names both `actions/checkout` and `actions/setup-node` as SHA-pinned, so the cited rule covers the pinned actions; the item states the invariant, not a new requirement.
5. (5) is dense and the tag check looser than the code — **partly fixed** (added the shorter-than-7-characters refusal); packing two surfaces into one item **declined**: the row asks for a single extension of the Critical list.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The audit overlay now treats an `install.sh` truncation-safety or tag-integrity regression, and a workflow that drops `permissions:` or uses an unpinned action, as Critical, and its `security:` gates run the installer's end-to-end test (skipped offline). Changed: `.flaitron/audit-overlay/SKILL.md` (+5/−5). `touches:` declared 1 file, changed 1 (plus this note and PLAN.md, excluded). Doc verdict: no change — the overlay is not in the AI-referenced list and no listed doc cites these lines. Learnings: N/A.

**Archived:** 2026-11-08
