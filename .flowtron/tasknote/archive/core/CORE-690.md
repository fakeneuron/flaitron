---
title: release v5.35.0
status: completed
tags: []
created: 2026-10-02
due:
related-tasks: [CORE-689, CORE-684]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flowtron/PLAN.md
  - .flowtron/tasknote/archive/core/CORE-690.md
---

# CORE-690 | release v5.35.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-689]] [[CORE-684]]

## 🎯 Goal

Cut v5.35.0 minor release tagging CORE-689 since v5.34.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.34.0` → `v5.35.0`
- [x] docs/MIGRATION.md example pin bumped `v5.34.0` → `v5.35.0`
- [x] SECURITY.md release-tag example pin bumped `v5.34.0` → `v5.35.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.35.0`, or recorded `skipped @ v5.35.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-690 — flowtron v5.35.0 (...)` commit lands — pending 🟢 GO, part of the atomic §7.5 sequence
- [x] Annotated `v5.35.0` tag created with adopter-facing release notes — pending 🟢 GO, part of the atomic §7.5 sequence
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.35.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin — pending 🟢 GO + push-go, part of the atomic §7.5 sequence
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-690.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.34.0 → v5.35.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [ ] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-689]] — the only `feat:` since v5.34.0; `/ft-release` now stops and asks on Medium/Low findings
- [[CORE-684]] — prior release (v5.34.0); precedent for the current 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established. v5.34.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. Six commits since the tag; highest rank is the single `feat:` (CORE-689), so minor. Operator filed the drafted line and locked v5.35.0.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — release cut. No code or module-boundary work. The deliverable is the version pins, stamp resolution, and the annotated tag.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- PLAN line filed this session under `## Medium` (no pending `release v*` existed; the `(none)` placeholder was replaced). Version locked: v5.34.0 → v5.35.0, minor. Active model is Grok 4.7, medium tier, equal to the `[medium]` tag. Context budget comfortable; the cut stays in this session.
- Drift check before the pin edits: `SPEC.md:3` was `**Version:** v5.34.0`. `docs/MIGRATION.md` example pin was `(e.g., \`v5.34.0\`)` on the `describe --tags` line (line 507). `SECURITY.md` release-tag pin was `(e.g. \`v5.34.0\`)` (line 125). No pin drift.
- Archive skim: CORE-043 (v1.0.0), CORE-046 (v1.1.0), and CORE-048 (v1.2.0) are the named precedents. CORE-048's acceptance still shifts `SPEC/versioning.md` patch/minor examples and has no SECURITY pin, dogfood gate, SOP-currency check, or VERSION-HISTORY prepend. Those steps left the recipe. CORE-684 (v5.34.0) is the living 6-line subtask shape this note copies. Line-numbered edits from CORE-048 are not re-resolved; the current skill names the three pins by grep, not by line.
- Adopter impact, each commit since v5.34.0. None requires a project-side edit (no new template section, no new adopter doc-set entry, no `BREAKING CHANGE`):
  - `0702cbec` CORE-687 — `docs/CONVENTIONS.md` credits `SPEC/scope-boundaries.md` for one sentence. Docs only.
  - `f7c6b5a4` CORE-686 — capability-probes row names the three tasknote drivers. Docs only.
  - `5f6ac937` CORE-685 — `SECURITY.md` and `SPEC/post-closure.md` name push as its own gated step. The protocol already committed without pushing; the docs now say so. No adopter edit.
  - `467447dd` CORE-688 — calibration roster restamped in `SPEC/model.md`, `claude/CAPABILITIES.md`, and `docs/PLATFORMS.md`. Docs only.
  - `d9476f63` CORE-689 — `/ft-release` stops and asks on Medium/Low findings. The skill is flowtron-self only. No adopter edit.
  - `c93302ce` — filing chore for CORE-689. None.
- No clarifications needed. Assumption: the tag's Migration block says no required project-side edits, and names the push-is-gated correction and the maintainer-only release-finding ask as awareness.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: single-token pin bumps and the dogfood-or-skip stamp shape, same recipe as CORE-684. No new shape. Minimal refactor: none; no unrelated cleanup.

The 3 version edits are single-token substitutions: `SPEC.md` `**Version:** v5.35.0`, `docs/MIGRATION.md` `(e.g., \`v5.35.0\`)` on the `describe --tags` line, `SECURITY.md` `(e.g. \`v5.35.0\`)` on the release-tag line. Post-edit residue of `v5.34.0` is historical (`docs/VERSION-HISTORY.md`, `docs/CONTEXT-BUDGET.md` measurement notes) plus the SOP `last-verified:` stamps and the dogfood skips below. The three release pins are clean.

**Dogfood gate resolved 2026-10-02.** Stamp files were empty at walk start. The operator declined the per-agent ask, so the walk used the fragment's evidence rule: this session is the release-driving Grok session, and no receipt was offered for the other three. Ledger:

- Grok → `v5.35.0 · 2026-10-02 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md` Grok row + `docs/PLATFORMS.md` Grok footer
- Claude → `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v5.35.0)` — written (no receipt) — `docs/AGENT-COMPAT.md` Claude row + `claude/CAPABILITIES.md`
- Codex → `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v5.35.0)` — written (no receipt) — `docs/AGENT-COMPAT.md` Codex row + `docs/PLATFORMS.md` Codex footer
- Cursor → `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v5.35.0)` — written (no receipt) — `docs/AGENT-COMPAT.md` Cursor row + `docs/PLATFORMS.md` Cursor footer

Step-5 ledger re-verify from file state printed nothing. Gemini / Aider / Amp stay `unverified` (noted-not-gated).

**SOP currency: clean.** One procedure, `SPEC/procedures/ft-task.md`, stamp date 2026-10-01. No tier-1 drift candidates. Tier-2 note: 2 `SPEC.md` commits since the stamp (`99458238` CORE-684 version bump; `b9118d10` CORE-660 gate-catalog move). The SOP points at `SPEC/post-closure.md` and does not restate the version pin or the gate catalog, so the count stays a note. Stamps not bumped.

No new tests. The standing viz + fleet-updater gate is Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

  Markdown version and stamp edits. No new logic, no dead code, no public-surface growth. Receipts are the standing-gate lines below.

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

  Reviewer did not write the diff. Blockers: none. Notes: none.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

  N/A — no UI, layout, or rendered-data change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass: the three version edits and the stamp edits are single-token substitutions. Surrounding prose unchanged. No frontmatter broken. No fenced block broken.

Standing gate:
- `npm --prefix viz test` → first run exit 1 (6 `App.test.tsx` timeouts plus 5 worker-start timeouts under load). Re-run exit 0, 29 files, 587 tests.
- `npm --prefix viz run typecheck` → exit 0
- `npm --prefix viz run lint` → exit 0
- `npm --prefix viz run build` → exit 0
- `node --test tools/update-adopters.test.mjs` → exit 0 (54 pass)
- `node --check tools/update-adopters.test.mjs` → exit 0
- `node --check tools/update-adopters.mjs` → exit 0
- `npm --prefix viz audit --audit-level=high` → exit 0, 0 vulnerabilities

CI on `0702cbec`: operator chose to push the 6 unpushed commits. Run 37071034252 concluded failure. `validate` (24) and `validate` (26) succeeded. `drift` failed on Context budget: `claude/skills/ft-release/SKILL.md` 34641 > 33000. The file is under its own 40,000 row. `$exact` kept newlines, so the space-delimited case never exempted it from the 33,000 glob. Fixed in this working tree with `tr '\n' ' '` in `.github/workflows/ci.yml` and `claude/skills/ft-release/step-7.1-standing-checks.md`. Local re-run of the budget block prints nothing and matches the exemption. The parent commit stays red; the fix rides in the release commit. Final-newline and Pair Q on the working tree both pass.

Doc sweep (`/ft-audit docs ai-referenced`) held three findings. The operator chose to fix them before the cut. Fixed inline: PLATFORMS unattended rows, AGENT-NEUTRALITY flag counts, README worktree gloss. The MIGRATION.md §3 anchor was checked against GitHub's rendered id `#3--lightweight-migration-current-tasks-only` and left as written. Re-run reported zero findings.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Re-run after the three inline fixes reported zero findings. README worktree gloss, PLATFORMS unattended rows, and AGENT-NEUTRALITY flag counts changed. The other swept docs had no sweep finding.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The context-budget exemption bug is recorded in the standing-check prose that runs the check.

**Final Summary:**

Cut v5.35.0. `/ft-release` now stops and asks on Medium and Low doc-sweep findings instead of filing them and continuing. The same cut records that ordinary closure commits and does not push, limits `unattended-mode.md` to the three tasknote drivers, restamps the calibration roster, and makes the context-budget specific-row exemption actually match. No adopter project-side edit is required.

**Archived:** 2026-10-02
