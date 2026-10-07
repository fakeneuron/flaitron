---
title: release-dangling-link-scope
status: completed
tags: [release, wiring]
created: 2026-10-07
due:
related-tasks: [CORE-721]
touches:
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-723 | release-dangling-link-scope

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-721]]

## 🎯 Goal

Make `/ft-release` §7.1's blocking local-wiring check catch a missing or dangling `.claude/skills/audit` overlay link (and any unprefixed local link), and correct the paragraph's false "committed repo state" claim.

## ✅ Acceptance

- [x] The local dangling-link scan has no `-name 'ft-*'` filter — `sed -n '/Local repo-scoped wiring/,/Machine-global wiring/p' claude/skills/ft-release/step-7.1-standing-checks.md | grep -- '-type l ! -exec test -e' | grep -vq "ft-\*"`
- [x] The skill audit link is pinned to the overlay by resolved path, so a *deleted*, copied-directory, or re-pointed link is caught — `grep -q 'cd -P .claude/skills/audit 2>/dev/null && pwd)" = "$(cd -P .flaitron/audit-overlay && pwd)' claude/skills/ft-release/step-7.1-standing-checks.md` (re-scoped from a `test -f` presence line by external-review pass 1, finding 1; resolved-path compare from pass 2, finding 2)
- [x] The non-symlink (copied-dir) scan stays `ft-*`-scoped — `grep -q "find .claude/skills .claude/commands -maxdepth 1 -name 'ft-\*' ! -type l -print" claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] The false "committed repo state" claim is gone and the fix posture names gitignored local state — `! grep -q 'committed repo state' claude/skills/ft-release/step-7.1-standing-checks.md && grep -q 'gitignored' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] The new commands report clean against the live checkout, and the widened scan + audit pin fire on simulated broken links — `judgment` + recorded run (simulation in a scratch copy of the link layout, never touching `.claude/`)
- [x] Directory budget holds — `cat claude/skills/ft-release/* | wc -c` ≤ 125,000

## 🧩 Subtasks

- [x] Drop `-name 'ft-*'` from the local dangling scan (`step-7.1-standing-checks.md` §"Local repo-scoped wiring")
- [x] Add the two `readlink` target pins for `.claude/skills/audit` and `.claude/commands/audit.md` (first drafted as a `test -f` presence line; replaced after review)
- [x] Update the prose after the block: count of commands, what the widened scan and the presence line catch, why the copied-dir scan stays `ft-*`-scoped, and the gitignored-state fix posture
- [x] Run the commands live and against a scratch simulation

## 🔗 Related

- [[CORE-721]] — predecessor; moved the overlay body to tracked `.flaitron/audit-overlay/`, making the unprefixed symlink the only path to it; its external review (finding 5) surfaced this gap

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is live: `step-7.1-standing-checks.md:74` scans `-name 'ft-*'` only, and `.claude/skills/audit -> ../../.flaitron/audit-overlay/` plus `.claude/commands/audit.md -> ../../claude/commands/ft-audit.md` are both unprefixed, so neither is resolved by any gate.

- [x] Read relevant source files — `claude/skills/ft-release/step-7.1-standing-checks.md` §"Standing self-wiring parity check" (lines 67–96), `.gitignore`, `ls -la .claude/skills .claude/commands`, `docs/CONTEXT-BUDGET.md` rows for `ft-release`

- [x] **Best Practices Review** — doc-only edit to one release fragment; extends the existing four-command block rather than adding a new check section. The copied-dir (4th) scan must stay `ft-*`-scoped: unprefixed forks are adopter full-copy territory by design, and widening it would make a legitimate copy a release blocker. The glob-free (`find`, not `for … in`) rule from §"Glob-free by design" is preserved — the audit pin is a `cd -P` path compare, no glob.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. [[CORE-721]] is load-bearing: its Discovery recorded "No `/ft-release` gate blocks either direction … `audit` is unprefixed by design (`SPEC/layout.md` §"Skill namespace")", and its external review finding 5 filed this. Its Acceptance also confirmed `.claude/` stays wholly gitignored (`grep -qx '\.claude/' .gitignore`).

- [x] **Drift check** — PLAN line and sidequest stub match code exactly (scan at `:74`, `ft-*` filter). Additional drift found in the same paragraph (`:79`): "`.claude/` is committed repo state, so the fix lands in this cut" — false, `.gitignore:25` ignores `.claude/`. Operator confirmed fixing it here. No SPEC contract conflict.

- [x] Asked clarifying questions — operator chose **widen + name** (drop the filter from the dangling scan *and* add an explicit audit presence line; copied-dir scan stays `ft-*`) and **fix the stale claim here**.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Dangling-only scans cannot see a *deleted* link (nothing to resolve), hence a separate audit pin — the "missing" half of the sidequest's "missing or stale link". (Planned here as a `test -f` presence line; the external review showed that passes on a copied dir, so it shipped as a resolved-path pin.)
- Directory budget: 116,540 / 125,000 before edit.
- The global (`~/.claude/`) half stays `ft-*`-scoped: global installs are utilities only, and forks are never installed globally.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: doc-only release fragment with no test harness; the commands were exercised live and in a scratch simulation (Testing Notes)

**Implementation Notes:**

- Extended the existing four-command block in `step-7.1-standing-checks.md` §"Local repo-scoped wiring" rather than adding a section: dropped `-name 'ft-*'` from the dangling scan (3rd command), appended a resolved-path pin for `.claude/skills/audit` (drafted as `test -f`, then `readlink` pins on both audit links, narrowed after two review passes — see Testing Notes), and rewrote the follow-on paragraph (four → five; why the dangling scan is unfiltered; what the pin catches that the scans cannot (deleted / re-pointed link → bundled scaffold; copied dir → stale body); a `DANGLING` audit link means a moved target; `.claude/` is gitignored, so fix inline — `rm` a retired slug, re-create a missing or miswired link — rather than "the fix lands in this cut"; why the local half blocks while the global half advises; `rm -r` before re-linking over a copied dir). The §"Glob-free by design" sentence no longer claims every scan is `ft-*`-filtered.
- No refactor. Glob-free rule preserved (`find` / `cd -P`, no shell glob). The global `~/.claude/` half stays `ft-*`-scoped on purpose.
- Directory total 116,540 → 117,927 (budget 125,000).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A as a suite; ran the §7.1 local commands live + scratch simulations (final block: five commands)

- [x] Ran lint/type-check on changed code — N/A: markdown only; checked trailing whitespace + final newline per `.editorconfig`

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no frontend change. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Final pass (Phase 3 re-run from the top after the pass-1 blocker; pin reshaped by pass-2 notes).**

Live checkout, the five local commands: `diff` skills → 0, `diff` commands → 0, dangling scan → no output, copied-dir scan → no output, audit resolved-path pin → 0. Clean.

Scratch simulations (`.claude/` layouts rebuilt under the scratchpad; the real `.claude/` was never touched):
- `sim.sh` — the unfiltered scan prints `DANGLING` for both audit links when their targets are absent; the old `-name 'ft-*'` scan prints nothing (the gap reproduced).
- `sim3.sh` — the resolved-path pin: correct link with and without trailing slash → nothing; deleted link, copied `audit/` dir holding a `SKILL.md`, link re-pointed at bundled `claude/skills/ft-audit/` → each prints `MISWIRED  .claude/skills/audit (…)`. Overlay target moved → pin compares empty to empty and stays quiet, but `cd` prints an error and the dangling scan reports `DANGLING`, so it is still caught.

Receipt:

| Acceptance | Command | Exit |
|---|---|---|
| Dangling scan unfiltered | `sed -n '/Local repo-scoped wiring/,/Machine-global wiring/p' … \| grep -- '-type l ! -exec test -e' \| grep -vq "ft-\*"` | 0 |
| Audit link pinned by resolved path | `grep -qF 'cd -P .claude/skills/audit 2>/dev/null && pwd)" = "$(cd -P .flaitron/audit-overlay && pwd)' …` | 0 |
| Copied-dir scan stays `ft-*` | `grep -q "find … -name 'ft-\*' ! -type l -print" …` | 0 |
| Stale claim gone | `! grep -q 'committed repo state' … && grep -q 'gitignored' …` | 0 |
| Live clean + simulated catch | judgment — runs above | — |
| Budget | `cat claude/skills/ft-release/* \| wc -c` → 117,927 ≤ 125,000 | 0 |

Structural: no duplication, no dead text, the follow-on prose matches the five-command block, no trailing whitespace. No other doc restates the command count.

**External review, pass 1** — `/code-review medium`, scoped to the working tree:

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 1 | `test -f` passes on a leftover pre-CORE-721 copied `audit/` dir, which no other command sees | **blocker** | **Fixed** — replaced with `readlink` target pins; back to Phase 2 |
| 2 | A re-pointed but resolving audit link (e.g. to bundled `ft-audit/`) passes everything | **blocker** | **Fixed** — same pins |
| 3 | "A full-copy fork is a legitimate unprefixed resident" contradicts `docs/MIGRATION.md` §1.2.2 (flaitron-self is uniformly symlinks) | note | **Fixed** — justification dropped; the copied-dir scan keeps its operator-chosen `ft-*` scope, and the pins cover the audit copy case |
| 4 | Criterion 5 has no recorded run | note | **No change** — the reviewer saw Testing Notes before they were filled; recorded above |
| 5 | Prose says a deleted link leaves `/audit` "with no skill body"; actually `ft-audit.md` silently falls back to the bundled scaffold | note | **Fixed** — confirmed against `claude/commands/ft-audit.md:5`; prose names the silent fallback |
| 6 | Deleting `.claude/commands/audit.md` goes unnoticed | note | **Fixed** — second pin added |
| 7 | "`DANGLING` = slug no longer ships" is incomplete for audit links | note | **Fixed** — "or, on an audit link, at a target that moved" |
| 8 | "re-link inline" is the wrong verb for `+` / retired-slug findings | note | **Fixed** — "`rm` a retired slug's link; re-create a missing or miswired one" |
| 9 | The unfiltered scan blocks on personal dangling links | note | **No change** — flaitron-self's `.claude/` holds only flaitron wiring (`docs/MIGRATION.md` §1.2.2), and widening was the operator's choice |

Pass-1 dispositions above are as recorded at the time; #6 was reversed in pass 2 (below).

**External review, pass 2** — `/code-review medium`, same scope, re-run because pass 1 returned blockers. No blockers.

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 1 | "In every case … falls back to the bundled scaffold" is wrong: a copied dir runs its stale body; a deleted `audit.md` still leaves the skill resolving as `/audit` | note | **Fixed** — prose split by case; command pin dropped (see #6) |
| 2 | Byte-exact `readlink` compare flags a correct link written without the trailing slash | note | **Fixed** — `cd -P` resolved-path compare; simulated both spellings clean |
| 3 | "re-create" over a copied dir with `ln -sfn` nests the link inside it | note | **Fixed** — prose says `rm -r` the copy first |
| 4 | Local half says "no commit carries the fix" yet blocks, with no reason vs the advisory global half | note | **Fixed** — names this checkout as the dogfood surface the release ships from (`docs/PLATFORMS.md` §"Installed-surface policy") |
| 5 | Audit target hardcoded in a second place with no sync pointer to `docs/MIGRATION.md` | note | **Fixed** — prose cites MIGRATION §1.2.2 with "keep the two in step" |
| 6 | The command pin enforces the `ft-audit.md` wrapper, which reaches `audit` only by model inference (`SPEC/layout.md` wrapper-name invariant) | note | **Fixed by removal** — pass-1 #6 reversed: a deleted `audit.md` does not break `/audit` (the skill resolves directly), so the pin guarded the weaker path; a *dangling* `audit.md` is still caught by the unfiltered scan. The wrapper-inference issue itself is pre-existing and not this task's surface |
| 7 | Acceptance 5 still names a "presence check" | note | **Fixed** |
| 8 | Discovery / Implementation notes still describe `test -f` | note | **Fixed** — notes record the draft → shipped evolution |
| 9 | Phase 3 box says "five" while notes said "six" | note | **Fixed** — final block is five; notes agree |
| 10 | §"Glob-free by design" still says every scan uses `-name 'ft-*'` | note | **Fixed** — "(`-name 'ft-*'` where name-filtered)" |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  No change across all 19 entries. The only ones touching this surface were re-read: `docs/MIGRATION.md` §1.2.2 ("`/ft-release` §7.1 checks for one"; "uniformly symlinks, which is one `find` to check") and `docs/PLATFORMS.md` §"Installed-surface policy" ("Flaitron's own checkout is not an adopter") remain true and now align with the edited prose. `README.md`, `AGENTS.md`, `SPEC.md`, the four snippets, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` do not describe the §7.1 local wiring check.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A for the always-loaded layer. Task-local lesson: a presence test (`test -f`) follows symlinks and so cannot tell a link from a copy; pin a symlink by resolved path.

**Final Summary:**

`/ft-release` §7.1's blocking local-wiring check now sees the unprefixed audit wiring. The dangling scan dropped its `ft-*` filter (covering `.claude/skills/audit` and `.claude/commands/audit.md`), and a fifth command pins `.claude/skills/audit` to `.flaitron/audit-overlay/` by resolved path, catching a deleted, re-pointed, or leftover-copied link — all of which `/audit` otherwise runs silently with the wrong body. The paragraph's false "`.claude/` is committed repo state" claim is replaced with the gitignored reality and an explicit reason the local half still blocks.

- Changed: `claude/skills/ft-release/step-7.1-standing-checks.md` (+3/−3 lines; the follow-on paragraph rewritten), this tasknote, PLAN.md stub flip, sidequest stub retired. Directory 116,540 → 117,927 / 125,000.
- Verification: six Acceptance commands → 0 (receipt in Testing Notes); live five-command run clean; scratch simulations cover every failure shape; CI's context-budget, Pair Q, and final-newline steps run locally → 0.
- Review: two `/code-review medium` passes — pass 1 returned two blockers (presence test blind to copied/re-pointed links), fixed by the resolved-path pin; pass 2 returned ten notes, all fixed (one by removing the pass-1 command pin).
- Refactors: none. Deferred: the `ft-audit.md` wrapper reaching `audit` only by model inference is pre-existing and outside this surface (pass-2 #6).
- `touches:` reconciliation: declared `claude/skills/ft-release/step-7.1-standing-checks.md`; also changed `.flaitron/PLAN.md`, `.flaitron/sidequest/CORE-723.md` (deleted), and this note — all workflow paths.
- Maintainability: the one unprefixed link that is the sole path to a tracked contract body can no longer break between releases unnoticed.

**Archived:** 2026-10-07
