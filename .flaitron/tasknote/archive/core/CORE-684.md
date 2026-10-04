---
title: release v5.34.0
status: completed
tags: []
created: 2026-10-02
due:
related-tasks: [CORE-677.1, CORE-674]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - viz/package-lock.json
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flowtron/PLAN.md
  - .flowtron/tasknote/archive/core/CORE-684.md
---

# CORE-684 | release v5.34.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-677.1]] [[CORE-674]]

## 🎯 Goal

Cut v5.34.0 minor release tagging CORE-677.1 since v5.33.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.33.0` → `v5.34.0`
- [x] docs/MIGRATION.md example pin bumped `v5.33.0` → `v5.34.0`
- [x] SECURITY.md release-tag example pin bumped `v5.33.0` → `v5.34.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.34.0`, or recorded `skipped @ v5.34.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-684 — flowtron v5.34.0 (...)` commit lands — pending 🟢 GO, part of the atomic §7.5 sequence
- [x] Annotated `v5.34.0` tag created with adopter-facing release notes — pending 🟢 GO, part of the atomic §7.5 sequence
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.34.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin — pending 🟢 GO + push-go, part of the atomic §7.5 sequence
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-684.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.33.0 → v5.34.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [ ] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-677.1]] — the only `feat:` since v5.33.0; scopes the Codex verification epic that forces the minor bump
- [[CORE-674]] — prior release (v5.33.0); precedent for the current 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established. v5.33.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. Eighteen commits since the tag; highest rank is the single `feat:` (CORE-677.1), so minor. Operator filed the drafted line and locked v5.34.0.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — release cut. No code or module-boundary work. The deliverable is the version pins, stamp resolution, and the annotated tag.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- PLAN line filed this session under `## Medium` (no pending `release v*` existed). Working tree already held an uncommitted flip of CORE-EPIC-679 to `## Completed`; that edit stays. Version locked: v5.33.0 → v5.34.0, minor. Active model is Grok 4.7, medium tier, equal to the `[medium]` tag.
- Drift check: `SPEC.md:3` is `**Version:** v5.33.0`. `docs/MIGRATION.md` example pin is `(e.g., \`v5.33.0\`)` on the `describe --tags` line. `SECURITY.md` release-tag pin is `(e.g. \`v5.33.0\`)`. No pin drift.
- Archive skim: CORE-043 (v1.0.0), CORE-046 (v1.1.0), and CORE-048 (v1.2.0) are the named precedents. CORE-048's acceptance still shifts `SPEC/versioning.md` patch/minor examples and has no SECURITY pin, dogfood gate, SOP-currency check, or VERSION-HISTORY prepend. Those steps left the recipe. CORE-674 (v5.33.0) is the living 6-line subtask shape this note copies. Line-numbered edits from CORE-048 are not re-resolved; the current skill names the three pins by grep, not by line.
- Adopter impact, each commit since v5.33.0. None requires a project-side edit (no new template section, no new adopter doc-set entry, no `BREAKING CHANGE`):
  - `b9118d10` CORE-660 — gate catalog moved to `docs/GATE-DISCIPLINE.md`; `SPEC/gate-discipline.md` keeps section homes and a pointer.
  - `64df2b9b` CORE-679.N — audit closure. None.
  - `dbfcc6b9` CORE-679.2 — Grok `spawn_subagent` parameters corrected. Guidance only.
  - `f731b464` CORE-678.N — audit closure. None.
  - `1304b99a` CORE-678.2 — SOP restatement trimmed. None.
  - `4be1d124` CORE-680 — expired epic forward-looking paragraph dropped. None.
  - `251d6f93` CORE-682 — a filing whose only PLAN dirt is new rows commits those rows. Behavior arrives with the bump.
  - `2f7ffa81`, `2d3ebb01`, `a98ac4ac` — filing chores. None.
  - `a78a8ae5` CORE-676 — Grok 4.7 calibration row. Docs only.
  - `e9be02ec` CORE-677.N, `65006162` CORE-677.4, `5230396e` CORE-677.2, `7b35a177` CORE-677.1 — Codex verification epic. Docs and a new-install staging note.
  - `fdf1b1ca` CORE-677.3 — Codex workflow parity fix. `docs/MIGRATION.md` gains a Codex-only `git add` for new installs. Already-wired adopters do not re-stage.
  - `06b28678` — flowtron's own Completed rotation. None.
  - `32790c19` CORE-675 — ft-task SOP learnings restated. None.
- No clarifications needed. Assumption: the tag's Migration block says no required project-side edits, and names the Codex-only staging paragraph, the gate-catalog move, and the Grok calibration / spawn-parameter corrections as awareness.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: single-token pin bumps and the dogfood-or-skip stamp shape, same recipe as CORE-674. No new shape. Minimal refactor: none; no unrelated cleanup.

The 3 version edits are single-token substitutions: `SPEC.md` `**Version:**`, `docs/MIGRATION.md` `(e.g., \`v5.34.0\`)` on the `describe --tags` line, `SECURITY.md` `(e.g. \`v5.34.0\`)` on the release-tag line. `v5.32.0` was not the pin; the previous pin was `v5.33.0`. Post-edit residue of `v5.33.0` is historical (`docs/VERSION-HISTORY.md`, `docs/CONTEXT-BUDGET.md` measurement note, `docs/CODEX-VERIFICATION.md` session record) plus the SOP `last-verified:` stamp and the dogfood stamps resolved below. The three release pins are clean.

**Dogfood gate resolved 2026-10-02.** Stamp files were empty at walk start. The operator declined the per-agent ask, so the walk used the fragment's evidence rule: this session is the release-driving Grok session, and no receipt was offered for the other three. Ledger:

- Grok → `v5.34.0 · 2026-10-02 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md` Grok row + `docs/PLATFORMS.md` Grok footer
- Claude → `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v5.34.0)` — written (no receipt) — `docs/AGENT-COMPAT.md` Claude row + `claude/CAPABILITIES.md`
- Codex → `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v5.34.0)` — written (no v5.34.0 receipt; the 2026-10-01 recheck in `docs/CODEX-VERIFICATION.md` reads v5.33.0) — `docs/AGENT-COMPAT.md` Codex row + `docs/PLATFORMS.md` Codex footer
- Cursor → `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v5.34.0)` — written (no receipt) — `docs/AGENT-COMPAT.md` Cursor row + `docs/PLATFORMS.md` Cursor footer

Step-5 ledger re-verify from file state printed nothing. Gemini / Aider / Amp stay `unverified` (noted-not-gated).

**SOP currency: clean.** One procedure, `SPEC/procedures/ft-task.md`, stamp date 2026-10-01. No tier-1 drift candidates. Tier-2 note: 1 `SPEC.md` commit since the stamp (`b9118d10` CORE-660, gate-catalog move). The SOP does not restate that catalog, so the count stays a note. Stamps not bumped.

No new tests. The standing viz + fleet-updater gate is Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

  Reviewer did not write the diff. Blocker: README count was 1052 and became false once this note joined the archive. Fixed to 1053. Notes, both fixed in `docs/CONTEXT-BUDGET.md`: the stamp no longer says every row was remeasured (large-reference figures stay the 2026-09-22 readings); the CORE-674 sentence no longer says those rows are the tables below.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

  N/A — no UI, layout, or rendered-data change. The viz lockfile bump is transitive devDependencies only.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass: the three version edits and the stamp edits are single-token substitutions. Surrounding prose unchanged. No frontmatter broken. No fenced block broken.

Standing gate, all exit 0:
- `npm --prefix viz test` → 0 (29 files, 587 tests)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (54 pass)
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0

CI on the commit this cut builds on (`b9118d10`): no runs. `main` is 15 commits ahead of `origin/main` (`a98ac4ac`), so GitHub has not seen HEAD. Last pushed commit's CI run completed success (`https://github.com/fakeneuron/flowtron/actions/runs/36692949575`). Not a pass. Handed to the operator at commit-go. Post-push run stays flag-don't-block.

Dependency audit: `npm --prefix viz audit --audit-level=high` first exited 1 (brace-expansion 5.0.9, undici 8.10.0, both high, both dev-transitive). `npm audit fix` moved brace-expansion 5.0.9 → 5.0.12 and undici 8.10.0 → 8.11.2 inside existing ranges. Re-audit → 0. Only `viz/package-lock.json` changed.

No new product behavior, so no new tests. Code-quality pass on the diff: N/A — markdown pins, stamp suffixes, a lockfile, and ledger numbers.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Subroutine `/ft-audit docs ai-referenced` (run once: rubric = the AI-referenced list; gates = Pair Q, final newline, context budget, all clean). Four Medium findings, zero Critical/High. Operator chose follow-ups, not inline fixes: CORE-685, CORE-686, CORE-687, CORE-688. Passes 3 and 5 were clean. Pins and stamps in SPEC.md, docs/MIGRATION.md, SECURITY.md, docs/AGENT-COMPAT.md, docs/PLATFORMS.md, and claude/CAPABILITIES.md are this cut's edits. README.md counter updated to 1053 / 2026-10-02, including this archived note. The other set members had no change from this cut.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The cut restamped numbers and pins the always-loaded layer already knows how to refresh.

**Final Summary:**

Cut flowtron v5.34.0, a minor release since v5.33.0. The bump is the Codex verification epic (CORE-677.1). Grok's sub-agent row now matches the live spawn parameters, the gate-skip catalog lives in docs/GATE-DISCIPLINE.md, and a filing whose only PLAN dirt is new rows commits those rows. No required project-side edits. Dogfood: Grok refreshed at v5.34.0 from this session; Claude, Codex, and Cursor skipped at v5.34.0. Four Medium doc findings filed as CORE-685 through CORE-688 and left out of the cut. Viz dev lockfile patched brace-expansion 5.0.12 and undici 8.11.2.

**Archived:** 2026-10-02
