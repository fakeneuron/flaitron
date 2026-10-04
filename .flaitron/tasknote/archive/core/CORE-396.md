---
title: release-v5.15.0
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-405, CORE-390, CORE-391, CORE-392, CORE-380]
---

# CORE-396 | release-v5.15.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-405]] [[CORE-390]] [[CORE-391]] [[CORE-392]] [[CORE-380]]

## 🎯 Goal

Cut the flowtron v5.15.0 minor release covering the 28 commits since `v5.14.1`
(incl. the roster 21→18 skill retirements), verifying that the `docs/MIGRATION.md`
retired-skills note covers all three folds and that the pre-`v5.15.0`
`last-verified` dogfood stamps are resolved.

## ✅ Acceptance

- [x] Relevance Assessment recorded with a verdict and rationale — **De-scope**, see Phase 1
- [x] `docs/MIGRATION.md` retired-skills table verified to cover `ft-debug`, `ft-sidequest`, `ft-quality` — all three present at `docs/MIGRATION.md:476-478`, correctly stamped `v5.15.0`; no edit needed (Finding #3)
- [x] Dogfood-stamp state (`claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`) assessed against the release-gate obligation — inventoried; correctly pinned to last real verification, resolution belongs to `/ft-release` Step 5's dogfood gate (Finding #4)
- [x] Correct execution path for a release cut identified and routed (`/ft-release` vs `/ft-task`) — `/ft-release`; routed via [[CORE-405]]
- [x] PLAN.md line reconciled so the release skill's Step 1 scanner can find it — satisfied by re-filing as [[CORE-405]] with the conforming `| release v5.15.0` shortname rather than by editing this task's line (a De-scoped line flips to `[x]`, which the scanner skips)

## 🧩 Subtasks

- [x] Confirm version state: `SPEC.md:3` vs `git describe` vs PLAN target
- [x] Classify the commit range to derive the bump kind
- [x] Verify the `docs/MIGRATION.md` retired-skills table entries
- [x] Inventory the dogfood stamps and their release-gate status
- [x] Read `claude/skills/ft-release/SKILL.md` and determine routing
- [x] Surface the routing finding to the operator

## 🔗 Related

- [[CORE-405]] — successor; the correctly-filed `release v5.15.0` line this task re-filed the cut as
- [[CORE-390]] — debug-mode fold (`/ft-debug` → `/ft-task --debug`); part of the 21→18 roster cut
- [[CORE-391]] — sidequest fold (`/ft-sidequest` → `/ft-file-followup --park`); part of the roster cut
- [[CORE-392]] — `/ft-quality` retirement; part of the roster cut
- [[CORE-380]] — prior release (v5.14.1), the precedent cut for this one

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** De-scope
  **Rationale:** The *work* is still needed — v5.15.0 is genuinely uncut and 28
  commits are unreleased — but it does not belong to this tasknote. The release
  recipe (5 version edits · dogfood gate · SOP-currency check · `/ft-audit docs`
  subroutine · annotated tag · push) lives entirely in
  `claude/skills/ft-release/SKILL.md`, and that skill's Step 2.5 names this exact
  anti-pattern verbatim — "running `/ft-task` against the pre-filed release line
  would drive the generic 4-phase flow without any of it." `/ft-task` structurally
  cannot deliver this Acceptance.

  Discovery first reached **Re-scope** (fix the shortname in place, hand the same ID
  to `/ft-release`), but that path collides: `/ft-release` §7.3 archives its own
  tasknote to `archive/core/CORE-396.md`, overwriting this De-scope record, and its
  Step 1 scanner only matches **un-checked** lines — so CORE-396 cannot be both
  closed here and open for the cut. Resolved by the operator as **De-scope**: close
  CORE-396 with this analysis as the record, and re-file the cut as [[CORE-405]] with
  a conforming `| release v5.15.0` shortname. No path collision, no lost record,
  SPEC-clean semantics on both lines.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A` — no code or module boundaries in scope;
  Discovery's deliverable is a routing determination plus a one-token PLAN.md
  shortname fix.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` holds no prior tasknote
  for a release driven through `/ft-task`. Every prior cut (CORE-380 v5.14.1,
  CORE-372 v5.14.0, CORE-361 v5.13.0, CORE-356 v5.12.0, CORE-346 v5.11.0,
  CORE-343 v5.10.1, CORE-341 v5.9.1, CORE-339 v5.9.0, CORE-332 v5.8.0,
  CORE-327 v5.7.2) was filed with the shortname `release vX.Y.Z` — space-separated,
  matching `/ft-release` Step 1's `release v*` scan — and driven by `/ft-release`.
  CORE-396's hyphenated `release-v5.15.0` is the first deviation from that precedent.

- [x] **Drift check** — see Discovery Notes; four findings, two blocking.

- [x] Asked clarifying questions — routing fork surfaced to the operator (see
  Discovery Notes finding #1); the answer determines whether this tasknote
  continues or de-scopes into a `/ft-release` handoff.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Version state — clean, no drift.**
`SPEC.md:3` reads `**Version:** v5.14.1`; `git describe --tags --abbrev=0` returns
`v5.14.1`. They agree, so there is no aborted-prior-release drift. The commit range
`v5.14.1..HEAD` is **28 commits** (16 `feat:`, 6 `docs:`, 5 `chore:`, 1 `fix:`), no
`feat!:` and no `BREAKING CHANGE:` — highest-rank classification is **minor**, so
`v5.14.1 → v5.15.0`. This matches the PLAN-line target exactly.

*Correction to the PLAN line:* it says "23 commits unreleased"; the actual count is
28. The line was filed at commit `3fe90a8`, and five commits have landed since
(CORE-397, the CORE-398..404 audit-sweep filing, CORE-398, CORE-399, and this
task's own filing). Not drift in the task's substance — just a stale count.

**Finding #1 (blocking) — wrong skill for the job.**
`claude/skills/ft-release/SKILL.md` is the canonical release runner and carries the
entire recipe `/ft-task` does not have: the 5 version edits (`SPEC.md:3`,
`docs/MIGRATION.md` pin, `SECURITY.md` pin, `viz/src/ui/constants.ts` `VIZ_VERSION`,
`viz/package.json` + `package-lock.json` resync), the **dogfood gate** (hard gate —
blocks tagging until every dogfooded row is refreshed or explicitly skipped), the
**standing SOP-currency check**, the three standing structural checks at §7.1
(symlink-wiring count · shipped-skill parity · installed-surface policy), the
`/ft-audit docs` subroutine sweep, the annotated-tag draft with the
`No required project-side edits` sentinel that `update-adopters.mjs` parses, and the
atomic commit → tag → push sequence behind a single 🟢 GO.

Step 2.5 of that skill states the rule directly: *"**Re-entry is `/ft-release`, not
`/ft-task <TASK-ID>`.** The release recipe … lives in *this* skill; running
`/ft-task` against the pre-filed release line would drive the generic 4-phase flow
without any of it."* Driving CORE-396 to closure here would produce a paper-complete
release — PLAN flipped, tasknote archived, no tag, no version bump, no dogfood
resolution.

**Finding #2 (blocking, one-token fix) — PLAN shortname won't match the scanner.**
`/ft-release` Step 1 scans un-checked task lines for a `| <shortname>` matching
`release v*` (case-insensitive glob). CORE-396 is filed as `| release-v5.15.0` —
**hyphenated**, so the glob does not match. `/ft-release` would report "Zero matches
… Do not scaffold" and bail. Every one of the ten prior release lines used the
space-separated `release vX.Y.Z` form. Fix: `release-v5.15.0` → `release v5.15.0`.

**Finding #3 (already satisfied) — MIGRATION.md retired-skills note.**
The PLAN line asks to verify the retired-skills note covers all three folds. It
already does — `docs/MIGRATION.md:474-479` table:

| Retired | Released in | Replacement |
|---|---|---|
| `ft-debug` | v5.15.0 | `/ft-task <ID> --debug` |
| `ft-sidequest` | v5.15.0 | `/ft-file-followup --park …` |
| `ft-quality` | v5.15.0 | None; run lint/typecheck/tests directly |

All three carry the correct `v5.15.0` "Released in" value, and the surrounding
§"Retired skills leave dangling symlinks" prose (`docs/MIGRATION.md:459-470`) gives
adopters the `find … -type l ! -exec test -e {} \; -print` cleanup command. Nothing
to change. Roster count confirmed independently: `claude/skills/` and `codex/skills/`
both hold **18** skill directories, matching the 21→18 claim and passing
`/ft-release` §7.1's shipped-skill parity check.

**Finding #4 (in scope for the cut, not for this tasknote) — dogfood stamps.**
The PLAN line asks to "refresh/skip-mark the `v5.14.1` last-verified stamps." Current
state:

| Surface | Stamp |
|---|---|
| `docs/AGENT-COMPAT.md:36` (Claude) | `v5.14.1 · 2026-07-27 (dogfooded)` |
| `docs/AGENT-COMPAT.md:37` (Grok) | `v5.14.0 · 2026-07-27 (dogfooded; skipped @ v5.14.1)` |
| `docs/AGENT-COMPAT.md:38` (Codex) | `v5.14.0 · 2026-07-27 (dogfooded; skipped @ v5.14.1)` |
| `claude/CAPABILITIES.md:59` | `v5.14.1 · 2026-07-27 (dogfooded)` |
| `docs/PLATFORMS.md:298,320` (Grok, Codex) | `v5.14.0 · 2026-07-27 (dogfooded; skipped @ v5.14.1)` |

These are **not** stale in the sense of needing an ad-hoc patch — they are correctly
pinned to their last real verification, and the mechanism that resolves them is
`/ft-release` Step 5's dogfood gate, which forces a refresh-or-skip decision per
agent at cut time and applies it across every stamp location together. Patching them
outside a release cut would desynchronize them from the version they claim to have
been verified at. This work belongs *inside* the v5.15.0 cut, which is a second
reason the task routes to `/ft-release`.

## 🛠️ Phase 2: Execution

`N/A — De-scoped at Phase 1.` Per SPEC §"📝 Phase 1: Discovery", a De-scope verdict
jumps to Phase 4 closure. No execution work was performed under this tasknote; the
release cut itself executes under [[CORE-405]] via `/ft-release`.

- [x] **Pattern survey** — `N/A` (no code changed)
- [x] **Minimal refactor gate** — `N/A` (no code changed)
- [x] Implemented the minimal solution — `N/A` (De-scoped)
- [x] Updated/added tests for non-trivial behavior — `N/A` (no behavior changed)

**Implementation Notes:**

The only working-tree writes attributable to this tasknote are the two PLAN.md
edits that Phase 4 closure performs: the CORE-396 stub flip into `## Completed`,
and the new CORE-405 line under `## High`. No source, doc, template, or skill file
was modified — Finding #3 confirmed `docs/MIGRATION.md` already correct, and
Finding #4 established that the dogfood stamps must not be patched outside a cut.

**Downstream-impact reconciliation scan.** The De-scope + re-file is a
direction-changing decision, so the scan ran per SPEC/tasknote-selection.md. Active
PLAN entries at scan time: `## High` — CORE-396 (this task); `## Medium` / `## Low`
— empty; `## Future Opportunities` — CORE-400 (model-edge-fragment-strategy).
CORE-400 shares no surface with release routing → **unaffected**, action: leave. No
other entry impacted; nothing to reconcile, so no user-confirm was required.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed (markdown-only closure)
- [x] Ran lint/type-check on changed code — `N/A`, no code changed
- [x] **Quality assertions** — `N/A` with reason: no code changed; the diff is two PLAN.md line edits plus this tasknote's archive move
- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched

**Testing Notes:**

Verification performed during Discovery, all read-only and reproducible:

| Check | Command | Result |
|---|---|---|
| Version agreement | `sed -n '3p' SPEC.md` vs `git describe --tags --abbrev=0` | both `v5.14.1` ✅ |
| Commit range + bump | `git log v5.14.1..HEAD --oneline` | 28 commits — 16 `feat:`, 6 `docs:`, 5 `chore:`, 1 `fix:`; no `feat!:`/`BREAKING CHANGE:` → **minor** → `v5.15.0` ✅ |
| Retired-skills coverage | read `docs/MIGRATION.md:474-479` | all 3 folds present, stamped `v5.15.0` ✅ |
| Roster 21→18 | `ls claude/skills/` · `ls codex/skills/` | 18 and 18, exact slug parity ✅ |
| Dogfood stamps | `grep -n 'dogfooded' docs/AGENT-COMPAT.md claude/CAPABILITIES.md docs/PLATFORMS.md` | 6 stamp locations inventoried, all correctly pinned ✅ |
| Shortname vs scanner | `claude/skills/ft-release/SKILL.md` Step 1 (`release v*`) vs PLAN line | mismatch confirmed — hyphenated form would bail ✅ |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 12 entries in `.flowtron/tasknote/README.md`
  §"AI-referenced docs"; per-entry verdicts below

- [x] Closed — every `## ✅ Acceptance` criterion ticked with annotations, YAML
  `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to
  the top of `## Completed`, CORE-405 filed under `## High`, tasknote moved to
  `.flowtron/tasknote/archive/core/CORE-396.md`

- [x] **Evidence-based recap** drafted

**Doc-drift sweep — per-entry verdicts:**

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change — version pin bumps under [[CORE-405]]'s cut, not here |
| `docs/MIGRATION.md` | no change — retired-skills table verified complete (Finding #3); example pin bumps under the cut |
| `claude/AGENTS-snippet.md` | no change |
| `codex/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — release-tag example pin bumps under the cut |
| `docs/AGENT-NEUTRALITY.md` | no change |
| `docs/PLATFORMS.md` | no change — Grok/Codex stamps resolve via the cut's dogfood gate (Finding #4) |
| `claude/CAPABILITIES.md` | no change — Claude stamp resolves via the cut's dogfood gate (Finding #4) |
| `docs/AGENT-COMPAT.md` | no change — all three matrix rows resolve via the cut's dogfood gate (Finding #4) |

**Final Summary:**

CORE-396 was filed as the v5.15.0 release ticket but landed on the wrong runner:
`/ft-task` carries none of the release recipe, and `claude/skills/ft-release/SKILL.md`
Step 2.5 explicitly names driving a pre-filed release line through `/ft-task` as the
anti-pattern it exists to prevent. Discovery also found the PLAN line's shortname
filed as `release-v5.15.0` (hyphenated), which `/ft-release` Step 1's `release v*`
scan would not match — it would have bailed with "Zero matches" even if invoked
correctly. Both blockers were latent; nothing would have surfaced them until a cut
was attempted.

The task is therefore **De-scoped**, not failed. Two of its four substantive asks
were resolved during Discovery and need no further work: the `docs/MIGRATION.md`
retired-skills table already covers all three folds (`ft-debug`, `ft-sidequest`,
`ft-quality`, each stamped `v5.15.0` at `docs/MIGRATION.md:476-478`), and the
`last-verified` dogfood stamps are *correctly* pinned to their last real
verification — patching them by hand outside a cut would desync them from the
version they claim, so they resolve through `/ft-release` Step 5's dogfood gate
instead. The release itself is re-filed as [[CORE-405]] with a conforming
`| release v5.15.0` shortname and the Discovery findings folded into its
description, so the cut starts with the version state, bump kind, and roster parity
already verified.

Net maintainability effect: a mis-routed ticket that would have produced a
paper-complete release — PLAN flipped and tasknote archived with no tag, no version
bump, and no dogfood resolution — is closed with the routing analysis preserved, and
the release is queued on the runner that can actually deliver it.

**Archived:** 2026-08-02
