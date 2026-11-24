---
title: reconciled-pin-guard
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-919, CORE-919.2, CORE-900, CORE-920.4]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-919.3 | reconciled-pin-guard

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-919]]

## 🎯 Goal

Make a `flaitron-reconciled:` pin in flaitron-self's audit overlay that trails the release version fail a mechanical check at the release cut, instead of waiting for an audit to notice.

## ✅ Acceptance

- [x] A `reconciled_pin` check in `tools/drift-checks.sh` passes on the live tree (pin v8.5.0 = `SPEC.md` v8.5.0) — `bash tools/drift-checks.sh reconciled_pin`
- [x] It fails `STALE PIN` on a seeded mismatch, and the self-test's coverage + floor cases accept it — `node --test tools/drift-checks.test.mjs`
- [x] `/ft-release` §7.1's local runner names it, so a cut that bumps `SPEC.md` without the pin fails before tagging — `grep -qF "brand_casing reconciled_pin" claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] Whole drift job and budgets still green — `bash tools/drift-checks.sh` (0); `shellcheck tools/drift-checks.sh` (findings all pre-existing, none in the new function)

## 🧩 Subtasks

- [x] Add `reconciled_pin()` (titled, read-set floor, `VACUOUS` on an unread side) at the end of `tools/drift-checks.sh`; its failure line carries the `git diff` triage command
- [x] Name it in the script header's no-catalogue-entry and read-set-floor lists
- [x] Add its seeded case to `tools/drift-checks.test.mjs`
- [x] Add it to the §7.1 runner line in `step-7.1-mirror-pairs.md` and the `ok`-line count beneath
- [x] (review note) `/ft-release` recipe names the pin bump: Acceptance line, §5 triage paragraph, §7.4 staging path
- [x] (doc-drift) `docs/CONVENTIONS.md` §"GitHub Actions CI" runner line + no-catalogue-entry roster

## 🔗 Related

- [[CORE-EPIC-919]] — parent epic (derived-figures)
- [[CORE-919.2]] — predecessor: bumped the pin to v8.5.0 by hand and filed this row
- [[CORE-900]] — the prior hand bump (v8.3.0 → v8.4.0) an audit caught
- [[CORE-920.4]] — sibling-epic trim of `claude/skills/ft-release/**` (95% of cap)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The pin has been hand-bumped three times now (CORE-839 → v7.5.0, CORE-874 → v8.3.0, CORE-900 → v8.4.0, CORE-919.2 → v8.5.0), and each time an audit caught it after the release, never the cut itself. A mechanical guard removes the class.

- [x] Read relevant source files — `.flaitron/audit-overlay/SKILL.md:4` (pin), `SPEC.md:3` (`**Version:**`), `claude/skills/ft-release/SKILL.md` §5 (bumps `SPEC.md:3` in Phase 2) + §7.1, `step-7.1-mirror-pairs.md:9-16` (local runner), `tools/drift-checks.sh` header + dispatcher + `coverage_pin` / `updater_roster`, `tools/drift-checks.test.mjs` CASES + coverage/floor tests, `.github/workflows/ci.yml` `drift` job.

- [x] **Best Practices Review** — The check follows the script's shape rules (one titled top-level function, `bad=`/`n` accumulators, `VACUOUS` floor, bash 3.2). It reads two in-tree files and no git state, so it runs the same in CI's shallow, tagless checkout and in the operator's §7.1 walk. Scoped to the one flaitron-self fork. A tracked-file grep would also hit `templates/audit-overlay-template.md` (`<version>`), `docs/MIGRATION.md`'s example and the updater's test fixtures.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`), 10 hits on `flaitron-reconciled`. Load-bearing: CORE-919.2 (bumped v8.4.0 → v8.5.0 after `git diff --quiet v8.4.0 v8.5.0 -- claude/skills/ft-audit/` was empty; filed this row); CORE-874 (v8.3.0, justified by a diff read = judgment); CORE-855 (reviewer saw the pin at v7.5.0 and did not file it). The triage rule each used — empty scaffold diff → bump, otherwise re-reconcile — goes into the failure line.

- [x] **Drift check** — PLAN line matches; pin reads v8.5.0 and `SPEC.md:3` reads v8.5.0, so the live tree passes. `ft-release/**` sits at ~95% (108,096 of 113,000). The chosen option spends ~70 bytes there. CI `drift` uses a default `actions/checkout` (depth 1, no tags), which rules out a tag comparison.

- [x] Asked clarifying questions — the operator picked **drift check vs `SPEC.md:3`** over the PLAN row's two options (a §7.1 prose step, or a tag-based drift check).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Timing. `/ft-release` §5 bumps `SPEC.md:3` in Phase 2, and the §7.1 local runner runs in Phase 4, before the commit and tag. With `reconciled_pin` on that runner line, a cut that forgets the pin fails in its own working tree. Between releases both read the last version, and CI stays green. A mid-cycle edit to `claude/skills/ft-audit/` doesn't trip the check. It surfaces at the next cut, which is when the overlay must be re-reconciled anyway.
- The audit overlay's pass-4 line ("a `flaitron-reconciled:` pin behind the current tag") stays. The audit remains a second net, and this row doesn't remove it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `coverage_pin` (CORE-924), the nearest sibling: two in-tree reads, `VACUOUS` on an unread side, one mismatch line.

- [x] **Minimal refactor gate** — no refactor; the header's two check lists each gain one name.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `reconciled_pin` seeded case (SPEC.md → v999.0.0) in `tools/drift-checks.test.mjs`

**Implementation Notes:**

- `reconciled_pin()` appended to `tools/drift-checks.sh`. It reads the pin from the overlay's frontmatter only (awk between the `---` fences) and the version from the first `**Version:** vX.Y.Z` line of `SPEC.md`. A non-semver or absent value on either side → `VACUOUS`. Mismatch → `STALE PIN` plus an indented triage line carrying the `git diff --stat <pin> HEAD -- claude/skills/ft-audit/` command that CORE-919.2 / CORE-874 ran by hand.
- I dropped a draft `n` counter: an empty read already fails the check, so it joins the header's "floor on their read set" list instead.
- Header's no-catalogue-entry list gains `reconciled_pin (CORE-919.3)`.
- `step-7.1-mirror-pairs.md` runner line + `ok` count: fifteen → sixteen (+33 bytes; `ft-release/**` 108,129 of 113,000).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh reconciled_pin                                → 0 (reconciled_pin ok)
node --test tools/drift-checks.test.mjs                                  → 0 (50 pass; incl. coverage + floor cases)
grep -qF "brand_casing reconciled_pin" claude/skills/ft-release/step-7.1-mirror-pairs.md → 0
bash tools/drift-checks.sh                                               → 0 (NEAR CAP advisories only, all pre-existing)
bash tools/drift-checks.sh 'pair_*' skill_name_invariant brand_nearmiss brand_casing reconciled_pin | grep -c ' ok$' → 16
shellcheck tools/drift-checks.sh                                         → 1, all findings pre-existing (lines 115–1054; none in the new function; not a CI gate for this file)
manual seed (SPEC.md → v8.6.0 in a temp copy)                            → 1: "STALE PIN  .flaitron/audit-overlay/SKILL.md  v8.5.0 vs SPEC.md v8.6.0"
```

Duplication / dead code / stale docs: none. The draft counter was removed, and the header lists were updated alongside it.

External review — `/code-review medium` over the uncommitted working tree, which holds only this task's diff (the tree was clean at start). It ran before the `docs/CONVENTIONS.md` and `ft-release/SKILL.md` edits.
- **important** — the triage `git diff --stat $pin HEAD` left out uncommitted scaffold edits made in the same cut, so it could say "bump" where "re-reconcile" was right. **Fixed:** dropped `HEAD` so the diff reads the working tree; the function comment says why.
- **note** — the release recipe never named the pin bump, so every cut would learn of it from a FAILED line. **Fixed:** an Acceptance line, a §5 triage paragraph, and `.flaitron/audit-overlay/SKILL.md` on the §7.4 `git add` line.
- **note** — `docs/CONVENTIONS.md:60` restated the old runner line and a "Seven checks" roster that also lacked `updater_roster` (CORE-936). **Fixed** in the doc-drift sweep (now nine).
- **note** — a quoted, CRLF or pre-release value reads as `VACUOUS`. **Fixed by documenting:** fail-loud on purpose, stated in the function comment; the overlay's pin has always been a bare `vX.Y.Z`.

Re-run after fixes: `bash tools/drift-checks.sh` → 0; `node --test tools/drift-checks.test.mjs` → 0 (50 pass); `ft-release/**` 108,536 of 113,000 (96%, NEAR CAP advisory; CORE-920.4 owns the trim).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md`: updated (the §7.1 runner line, plus `updater_roster` and `reconciled_pin` added to the no-catalogue-entry roster, seven → nine). No change: `README.md`, `AGENTS.md` (names drift checks only as "among others"), `SPEC.md`, `docs/MIGRATION.md` (adopter-side `/ft-update` pin flow, untouched), the four `*/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-24.` stub nested under CORE-EPIC-919 (CORE-919.N still open, so no parent flip), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary. `touches:` reconciled: `git diff --name-only` = the five declared paths.

- [x] **Learnings** — N/A

**Final Summary:** New `reconciled_pin` drift check (`tools/drift-checks.sh`) holds the audit overlay's `flaitron-reconciled:` equal to `SPEC.md`'s `**Version:**`. It runs in CI and in `/ft-release` §7.1's local runner, which comes after §5's version bump and before the tag, so a cut that leaves the pin behind now fails in the cut itself instead of at the next audit. The failure line carries the working-tree scaffold-diff triage (empty → bump; otherwise re-reconcile). The release recipe now names the bump (Acceptance, §5, §7.4 staging). Seeded self-test case added. `docs/CONVENTIONS.md` roster corrected (also adds CORE-936's missing `updater_roster`). Verification: drift job 0, self-test 50/50, `ft-release/**` +440 bytes → 96%. Operator chose this over the PLAN row's §7.1-prose and tag-comparison options at Discovery. Hand-off: none deferred.

**Archived:** 2026-11-24
