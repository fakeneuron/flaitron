---
title: release v5.17.0
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438, CORE-EPIC-431, CORE-430, CORE-429, CORE-428, CORE-427]
---

# CORE-443 | release v5.17.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]] [[CORE-EPIC-431]] [[CORE-430]] [[CORE-429]] [[CORE-428]] [[CORE-427]]

## 🎯 Goal

Cut the v5.17.0 minor release tagging the 42 commits since v5.16.0 — headlined by Cursor first-class wiring, viz fleet-scale watcher + scoped SSE, GitHub Actions CI, filing auto-commit, and curated VERSION-HISTORY.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.16.0` → `v5.17.0`
- [x] docs/MIGRATION.md example pin bumped `v5.16.0` → `v5.17.0`
- [x] SECURITY.md release-tag example pin bumped `v5.16.0` → `v5.17.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.16.0` → `v5.17.0`
- [x] `viz/package.json` `"version"` bumped `"5.16.0"` → `"5.17.0"` (bare semver, no `v` prefix), `viz/package-lock.json` resynced to match
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.17.0`, or recorded `skipped @ v5.17.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-443 — flowtron v5.17.0 (...)` commit lands
- [x] Annotated `v5.17.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.17.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-443.md`

## 🧩 Subtasks

- [x] 5 version edits (+ package-lock resync)
- [x] Dogfood gate walk (Claude / Grok / Codex / Cursor refresh-or-skip)
- [x] SOP-currency check (flag-don't-bump)
- [x] viz lint/typecheck/test + updater test suite
- [x] Doc-drift sweep + standing checks (wiring count · skill parity · installed surface · self-wiring · README counter · mirror pairs A–H)
- [x] Tag message drafted and approved
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-427]] — prior release v5.16.0 (precedent)
- [[CORE-EPIC-438]] — Cursor first-class thin wiring (headline)
- [[CORE-EPIC-431]] — viz fleet-scale watcher + scoped SSE
- [[CORE-430]] — GitHub Actions CI workflow
- [[CORE-429]] — auto-commit filed tasks
- [[CORE-428]] — curated VERSION-HISTORY + `/ft-release` prepend

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:3` and `git describe --tags` both read `v5.16.0` (no drift). 42 commits since the tag — 14 `feat:`, 17 `chore:`, 6 `docs:`, 3 `fix:`, 1 `ci:`, 1 unprefixed additive — with zero `feat!:` and zero `BREAKING CHANGE:` bodies. Highest rank is minor → `v5.17.0`, matching the PLAN-line target and the user-confirmed bump (`go` on the suggested line).

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:445` example pin, `SECURITY.md:114` release-tag pin, `viz/src/ui/constants.ts:41`, `viz/package.json:4`, `viz/package-lock.json:3,9`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — [[CORE-427]] (v5.16.0) is the direct prior precedent: same five-pin, dogfood-gate, SOP-currency, doc-sweep, tag, archive shape, reused here. **Structural drift since that cut:** (1) [[CORE-428]] added the VERSION-HISTORY prepend as a release-recipe step (CORE-427's Acceptance did not carry it); (2) [[CORE-438.5]] enrolled Cursor as a fourth dogfooded row, so the gate is now Claude / Grok / Codex / Cursor; (3) [[CORE-EPIC-433]] widened standing checks to mirror pairs F–H (park-priority flags, `--worktree` roster, validation-command roster). This cut is the first to exercise VERSION-HISTORY prepend + Cursor dogfood + pairs F–H together.

- [x] **Drift check** — all five pins resolved at `v5.16.0` pre-edit; last tag matched `SPEC.md:3`. No drift in the cited locations.

- [x] **Adopter migration impact** — classified all 42 commits; see Discovery Notes. **Verdict: no required project-side edits.**

- [x] No clarifications needed beyond the mandatory dogfood-gate resolution (asked via AskUserQuestion in Phase 2). Bump is minor, not major; adopter impact is unambiguous — no skill retired, no skill added, snippet `ln -s` count unchanged at 22.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** 42 commits since v5.16.0. Prefix mix: 14 `feat:` / 17 `chore:` / 6 `docs:` / 3 `fix:` / 1 `ci:` / 1 unprefixed (`921911e` CORE-433.3 — additive release-gate work, no conventional prefix; does not change the minor bump). Zero `feat!:`, zero `BREAKING CHANGE:`.

Themes:

1. **Cursor first-class wiring** (headline). [[CORE-EPIC-438]] ships the thin `cursor/` bundle (snippet + `ft-task` procedure pointer), surface integration, dogfood, and fourth gated-row enrolment. Existing Claude-wired projects already work in Cursor via `.claude/skills/` compat; Cursor-only is opt-in at adoption.
2. **viz fleet-scale watcher.** [[CORE-EPIC-431]] splits the watch set, attributes SSE change events to the project, and pins the integration without booting Vite.
3. **CI + release hygiene.** [[CORE-430]] GitHub Actions workflow; [[CORE-434]] pin actions + restrict token; [[CORE-436]] README build badge; [[CORE-428]] curated `docs/VERSION-HISTORY.md` + `/ft-release` prepend.
4. **Filing / commit-gate ergonomics.** [[CORE-429]] auto-commits filing-only skills; [[CORE-437]] shrinks the 📦 fire set (privileged-ops + bundled prompts only).
5. **Honest viz edge states.** [[CORE-EPIC-432]] honest header version, prune epic children under filter, validate `FLOWTRON_UPDATE_LATEST` at the seam.
6. **Release-gate widening.** [[CORE-EPIC-433]] park/worktree roster gates + validation-command roster sync; [[CORE-439]] one canonical skill-install path; [[CORE-440]]/[[CORE-441]] AGENTS roster `/ft-release` vs `/ft-update` split; [[CORE-442]] drop stale audit-docs allowlist; [[FE-085]] reject `!!omap` in parseTasknote YAML engine.

**Adopter impact: no required project-side edits.** Verified rather than assumed:

- **No skill retired and none added** — `git ls-tree v5.16.0 claude/skills/` vs `ls claude/skills` are the same 18 slugs. `grep -c '^ln -s' claude/AGENTS-snippet.md` is **22 at both v5.16.0 and HEAD**. Fleet-updater `WIRING_SURFACES` diffs `claude/skills/` (and Codex `codex/skills/`); no added skill files, so the range will not flag new-wiring.
- **Snippet diffs are prose-only** — Claude snippet gained a Cursor verification sentence; Codex snippet corrected the maintainer hot-reload path away from `~/.agents/skills/` glob ([[CORE-439]]). Neither adds an `ln -s` to the adopter paste-block. Re-pasting is optional.
- **`cursor/` is new** but consumed by reference from the submodule. Existing Claude-wired adopters need no project-side edit. Cursor-only wiring is a new adoption path, not a migration of an existing one.
- **Contract and skill-body changes** (filing auto-commit, loosened 📦, CI in flowtron-self) are picked up on bump with no project-side edit. CI workflow lives in this repo, not in adopters.

**One recommended (not required) alignment — [[CORE-439]].** Anyone who followed the old Codex snippet's `ln -s ~/code/flowtron/codex/skills/* ~/.agents/skills/` glob should move those wrappers to repo-scoped `.agents/skills/` (the snippet now says so). Harmless if ignored on a Claude-only machine; load-bearing if Codex wrappers were globally installed, because `~/.agents/skills/` is read by Claude and Cursor too.

**Sentinel note:** because the verdict is "no required edits", the tag's Migration block must open with the exact `No required project-side edits` sentinel — `tools/update-adopters.mjs:migrationBearingTags` does a `startsWith` on it, and as of [[CORE-424.3]] the gate is fail-closed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — five-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution — five pins landed; dogfood stamps pending operator resolution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**Five version edits (landed):**
1. `SPEC.md:3` → `v5.17.0`
2. `docs/MIGRATION.md:445` example pin → `v5.17.0`
3. `SECURITY.md:114` release-tag pin → `v5.17.0`
4. `viz/src/ui/constants.ts` `VIZ_VERSION` → `v5.17.0`
5. `viz/package.json` + `viz/package-lock.json` bare `"5.17.0"`

**Residual `v5.16.0` grep (expected only):** dogfood stamps (unresolved until the gate walk); write-once `docs/VERSION-HISTORY.md` v5.16.0 heading; CORE-438.5 first-use prose in `docs/PLATFORMS.md:411` (historical, not a pin).

**SOP currency:** one tier-1 candidate on `SPEC/procedures/ft-task.md`:
- `fa1307f` CORE-438.2 — YAML `description:` colon→em-dash so Cursor accepts the frontmatter. Claude-only skill-dispatch field; SOP does not restate skill YAML. **Dismiss** (no neutral-layer surface).
- Tier-2 note: 5 `SPEC.md` commits since stamp. SOP skip/fire already matches CORE-437 (privileged-ops + bundled prompt); remaining SPEC.md commits are layout / prior-release / filing-only. No follow-up.

**Dogfood gate (resolved):**
- Claude — skipped @ `v5.17.0` (prefix stays `v5.16.0 · 2026-08-09`; matrix + `claude/CAPABILITIES.md`)
- Grok — skipped @ `v5.17.0` (prefix stays `v5.16.0 · 2026-08-09`; matrix + `docs/PLATFORMS.md` footer)
- Codex — skipped @ `v5.17.0` (prefix stays `v5.15.0 · 2026-08-02`; suffix bumped from `@ v5.16.0`; matrix + `docs/PLATFORMS.md` footer)
- Cursor — refreshed → `v5.17.0 · 2026-08-12 (dogfooded)` (this `/ft-release` session; matrix + `docs/PLATFORMS.md` footer)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A (version strings + stamps + two standing-check text substitutions; no logic)

- [x] (frontend) Visual confirmation — N/A (version string only; no UI chrome change)

**Testing Notes:**

- `npm --prefix viz test` — 22 files / 336 tests passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — 34/34 passed
- `node --check` on updater + test file — clean
- Markdown edits are single-token version substitutions plus dogfood stamps, README counter, and Pair F flag restore; frontmatter and fences untouched

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep report:**

### `/ft-audit docs` (subroutine mode — no PLAN writes)

**Pass 1 Claims vs. code** — clean after standing-check absorbs. Version pins match live files; dogfood stamps match matrix/footers; shipped skill inventories match snippets; installer counts still 22.

**Pass 2 Cross-doc consistency** — clean. The five release pins agree at `v5.17.0`. Dogfood tetrad (Cursor refreshed, Claude/Grok/Codex skipped @ v5.17.0) is consistent across `AGENT-COMPAT.md` + `CAPABILITIES.md` + `PLATFORMS.md`.

**Pass 3 Cross-references** — clean. Illustrative `e.g.` / fenced paths only; no live broken links in the AI-referenced set.

**Pass 4 Currency** — README counter corrected 645→**677**; date range 2026-04-28 → 2026-08-12. Nine archive files lack filled `**Archived:**` dates (was 2 at CORE-427) — archive-hygiene, not release drift; leave for a follow-up if material.

**Pass 5 Stale content** — clean. Residual `v5.16.0` hits are historical VERSION-HISTORY, CORE-438.5 first-use prose, or deliberate skip prefixes.

**Findings:** zero Critical / High / Medium / Low from the subroutine. Standing Pair F miss absorbed inline (see below).

### Standing checks (§7.1)

| Check | Result |
|---|---|
| Claude symlink-wiring count (`ln -s` = 22 = MIGRATION 1.6 = ft-new-project Step 7/8) | clean |
| Shipped-skill parity (claude ↔ codex inventories) | clean |
| Installed-surface policy (adopter subset exact; forbidden empty) | clean |
| Local self-wiring (`.claude/` ↔ shipped; no dangling; no non-symlink) | clean |
| Global wiring (advisory) | clean — 23 links, single path casing `/Users/fakeneuron/Code/flowtron`, no dangling |
| README task-counter | fixed 645→677; matches archive |
| Mirror pair A (templates roster) | clean |
| Mirror pair B (Claude flags ↔ Codex descriptions) | clean |
| Mirror pair C (template `../PLAN.md` depth) | clean |
| Mirror pair D (= README counter) | clean |
| Mirror pair E (`ft-flowtron` roster ↔ shipped + flags) | clean |
| Mirror pair F (park-priority flags) | **absorbed** — CORE-441 stripped flags from AGENTS.md; restored `--park [--low|--med|--fut|--high]` on the names-only roster (Pair F presence gate) |
| Mirror pair G (`--worktree`) | clean |
| Mirror pair H (validation command roster + CI verbatim) | clean |

**Final Summary:** Cut flowtron v5.17.0 — 42 commits since v5.16.0. Headline: Cursor first-class thin wiring (fourth dogfood row); viz fleet-scale watcher + scoped SSE; GitHub Actions CI; filing-skill auto-commit + loosened 📦; curated VERSION-HISTORY. Dogfood: Cursor refreshed, Claude/Grok/Codex skipped @ v5.17.0. Adopter impact: no required project-side edits; recommended CORE-439 Codex install-path alignment only. Migration block opens with the fail-closed sentinel.

**Archived:** 2026-08-12
