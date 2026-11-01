---
title: release-and-parity-run
status: completed
tags: [fleet, pin-bump, release]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.6, CORE-852.N, NAT-494]
touches:
  - .flaitron/PLAN.md
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
blocked-by:
  - CORE-852.6
---

# CORE-852.7 | release-and-parity-run

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-852]] [[CORE-852.6]] [[CORE-852.N]] [[NAT-494]]

## 🎯 Goal

Prove the merged updater plans the same fleet bump as natabula's `wave-bump.sh` (dry runs side by side over `~/Code`, fakeneuron attended in both, diff recorded), then cut a flaitron minor release via `/ft-release` so natabula NAT-494 can wrap it.

## ✅ Acceptance

- [x] Both dry runs ran against a scratch flaitron clone carrying a provisional annotated `v8.2.0` tag, with natabula's policy (`--only` = participating top-level repos, `--branch main`, `--attended-ledger content/brand-evidence/flaitron/reviewed.json`); raw outputs saved in the scratchpad — receipt in Testing Notes (both commands → exit code)
- [x] Repo plans match: each output normalised to `repo → bump | skip:<class> | current`, then `diff` of the two → exit 0, or every remaining line is an **expected** difference named in Implementation Notes — `diff` receipt + `judgment` on the expected list
- [x] fakeneuron is skipped as attended in both — `grep` for fakeneuron's row in each raw output (both show the reviewed-ledger skip)
- [x] Nothing real was written: no `v8.2*` tag in the flaitron checkout, and every fleet repo's `git status --porcelain` + HEAD unchanged — `git tag -l 'v8.2*'` prints nothing; before/after snapshot `diff` → exit 0
- [x] Any real divergence is fixed in the updater with a test, and the parity run re-run clean — `node --test tools/update-adopters.test.mjs` → exit 0 — N/A: no divergence (both diffs exit 0)
- [x] Release handed to `/ft-release` (operator chose option A at 🛠️): `.7`'s PLAN line carries the hand-off, and the cut runs right after this closure commit — `grep -q 'follows via `/ft-release`' .flaitron/PLAN.md`
- [x] Drift checks pass — `bash tools/drift-checks.sh` → exit 0

## 🧩 Subtasks

- [x] Snapshot fleet state (HEAD + porcelain per participating repo, flaitron tags)
- [x] Clone flaitron into the scratchpad; add an annotated `v8.2.0` tag on HEAD with a `Migration: No required project-side edits` block
- [x] Build the `--only` list from `discover-fleet.sh | filter_participating`, keeping top-level dirs (excluding flaitron itself)
- [x] Dry-run `wave-bump.sh --target v8.2.0` with `FLAITRON_REPO=<clone>`; dry-run the clone's `tools/update-adopters.mjs --target v8.2.0 --root ~/Code --branch main --attended-ledger … --only …`
- [x] Normalise both outputs, diff, classify each difference expected vs real; record the diff in Implementation Notes
- [x] Fix any real divergence — N/A, none in the updater (+ test) and re-run; otherwise N/A
- [x] Re-snapshot and diff against the first snapshot
- [x] PLAN line re-scoped (option A, operator 2026-11-01); the `/ft-release` cut follows this note's closure commit

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.6]] — predecessor (Fan-out: sequential after .6); its residuals are inputs to this parity run
- [[CORE-852.N]] — terminal audit
- [[NAT-494]] — natabula wrapper, blocked by this release (follow-up, cross-repo)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope (release half)
  **Rationale:** The parity half stands as filed. The release half can't run as written: `/ft-release` scaffolds its **own** release tasknote under a new CORE ID and needs exactly one pending `| release v*` row (`claude/skills/ft-release/SKILL.md` Steps 1, 3). No archived epic child has cut a release inline (CORE-267 / 349 / 420 / 556 children only *edited* the skill). So this note can't contain the cut; it can only hand it off. Fires 🛠️.

- [x] Read relevant source files — `tools/update-adopters.mjs` header (usage, gates, follow-through, `FLAITRON_REPO` = the script's own checkout), natabula `scripts/wave-bump.sh` (usage, target default, migration gate, discovery), `scripts/lib/participation.sh` + `participation.txt`, `claude/skills/ft-release/SKILL.md` Steps 0–2 + outline, `SPEC/epic.md`.

- [x] **Best Practices Review** — N/A for the run itself (read-only dry runs). A divergence fix would land in `tools/update-adopters.mjs` under its existing gate shape (CORE-479 inline gates).

- [x] **Archive skim** — `archive/core/` (CORE-* → `archive/core/` per README table). CORE-852.1 already skimmed the updater's 214 hits; its behaviour matrix is the reference for **expected** differences. CORE-852.6's Final Summary hands `.7` three `/ft-update`↔updater residuals (untracked non-exact retired Codex link; hook-rejected Step 5 commit; fence-aware headings → CORE-853). Those compare `/ft-update` with the updater, not `wave-bump.sh` with the updater, so they are out of this diff's scope. Recorded as context.

- [x] **Drift check** — paths hold. One drift in the plan's premise: the fleet is **all at v8.1.0**, the newest tag (24 participating repos, all on `main`), so "dry-run before tagging" at the latest tag would compare two all-`current` plans. Resolved by a scratch clone plus a provisional tag (operator choice, below). Updater discovery is one level deep and wave-bump's is recursive. With `--only` limited to top-level participating repos, nested repos (`mcp-servers/polymarket-mcp-server`, non-participating anyway) drop out on both sides.

- [x] Asked clarifying questions — two, both answered with the recommended option:
  - **Parity target:** scratch clone of flaitron with a provisional annotated `v8.2.0` tag on HEAD; `wave-bump.sh` via `FLAITRON_REPO=<clone>`, the updater run from the clone (its `FLAITRON_REPO` is its own checkout). Real tags and adopters are never touched.
  - **On divergence:** fix the updater in this task and re-run; release only once the plans match.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Release hand-off options (for the 🛠️ gate):**
- **A (recommended): close `.7` first, then `/ft-release`.** `.7` commits the parity record (and any updater fix) so both ship *in* the tag. The cut follows straight away via `/ft-release`, which drafts and files its own `release v8.2.0` row (Step 1.1) and drives its own note. The Acceptance "release" line becomes "handed to `/ft-release`". This rewrites `.7`'s PLAN line: the release clause moves to the `/ft-release` row, and NAT-494 is unblocked by that row's tag.
- **B: keep `.7` open across the cut.** Run `/ft-release` nested while this note stays untracked, then close `.7` after the tag. The PLAN line is unchanged. The cost: two in-flight notes, and the tag points at a tree where `.7` is still open.

**Expected differences (from the CORE-852.1 matrix), not divergences:** output format (table vs `✓ ⚠ ⏭ ⬆` lines); skip-reason wording; updater-only gates (gitlink drift, pinned-ahead, missing pinned tag); post-checkout verify is apply-only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — ran each tool exactly as its caller does: `wave-bump.sh` from natabula's cwd with `FLAITRON_REPO`, and the updater from its own checkout (the clone). The `--only` list is built the way NAT-494's wrapper would build it, from `discover-fleet.sh | filter_participating`. The normaliser is a throwaway scratchpad script, not a repo deliverable.

- [x] **Minimal refactor gate** — N/A: no repo code changed

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no divergence, so no updater change

**Implementation Notes:**

**Setup.** Scratch clone of flaitron at `b866bc94` in the session scratchpad (`parity/flaitron-clone`), with an annotated provisional `v8.2.0` on HEAD. Policy passed to the updater: `--root ~/Code --target v8.2.0 --branch main --attended-ledger content/brand-evidence/flaitron/reviewed.json` plus 24 `--only` names (participating, top-level, flaitron excluded). `wave-bump.sh --target v8.2.0 ~/Code`, dry run.

**Parity diff.** Each output is normalised to `repo -> bump | skip:attended-ledger | skip:migration | current`.

| Run | Tag's Migration block | wave-bump | updater | `diff` |
|---|---|---|---|---|
| primary | `Migration:` / next line `No required project-side edits.` (the real tags' shape, cf. v8.1.0) | 23 bump · fakeneuron skip (ledger) | 23 bump · fakeneuron skip (ledger) | exit 0 |
| negative | `Migration: No required…` on the heading line, so the block asks | 23 skip (migration) · fakeneuron skip (ledger) | 23 skip (migration) · fakeneuron skip (ledger) | exit 0 |

Same 24 repos, same order, same class per repo in both runs. The negative run also shows both tools check the ledger gate **before** the migration gate (fakeneuron is reported as attended, not migration). The updater additionally prints the suggested owner-task line (`bump flaitron v8.1.0 → v8.2.0 and refresh …reviewed.json`).

**Expected differences (not divergences):** output format (fixed-width table vs `⬆ ⏭` lines + summary); skip-reason wording; updater exits 0/1/2 where wave-bump exits 0; the updater needs the participation list as `--only`, which the NAT-494 wrapper computes.

**Real divergences:** none. Nothing to fix before the cut.

**Coverage limit, stated plainly:** a dry run compares the *selection* plan only. Neither tool's dry run prints the follow-through (pin line, Workflow block, link create/prune), and none of the 24 repos tripped the fork pass-gap gate in either. The apply-path parity rests on `.4`/`.5`'s fixture tests, not on this run. NAT-494's first real wave is its live check.

**Harness slips on the way (no tool fault):** a first run passed `--only …` as one zsh word (the updater exited 2 `Unknown arg`, correctly). That run's tag also put the sentinel on the heading line, which became the negative case above.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed (the updater is untouched; `.2`–`.5` ran its suite)

- [x] Ran lint/type-check on changed code — N/A: markdown only (PLAN line + this note); drift checks below

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the diff is one PLAN-line rewrite (operator-chosen at 🛠️) and this note. No executable change to grade; the parity evidence is the run receipts below

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `FLAITRON_REPO=<clone> bash scripts/wave-bump.sh --target v8.2.0 ~/Code` → exit 0 (23 would bump, 1 skipped)
- `node <clone>/tools/update-adopters.mjs --root ~/Code --target v8.2.0 --branch main --attended-ledger content/brand-evidence/flaitron/reviewed.json --only …×24` → exit 0 (would bump 23 · 1 skipped · 0 failed)
- `bash parity-diff.sh` (primary) → `diff exit 0`, 24/24 rows; negative → `diff-neg exit 0`, 24/24 rows (23 migration, 1 ledger)
- fakeneuron row: wave `SKIP: reviewed Flaitron evidence needs attended refresh (content/brand-evidence/flaitron/reviewed.json)`; updater `⏭ fakeneuron (v8.1.0): skipped — attended ledger tracked (…reviewed.json)`, in both runs
- `diff snap-before.txt snap-after.txt` (HEAD + `status --porcelain`, 24 repos) → exit 0; `git tag -l 'v8.2*' | wc -l` in the real checkout → `0`
- `node --test tools/update-adopters.test.mjs` → N/A (no divergence, no change)
- `grep -q 'follows via `/ft-release`' .flaitron/PLAN.md` → exit 0
- `bash tools/drift-checks.sh` → exit 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change. No behaviour moved; the version bump and VERSION-HISTORY entry belong to `/ft-release`.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A for the always-loaded layer. Note for a future parity check: a dry run whose target equals the fleet's pin compares nothing, so give it a provisional tag in a scratch clone.

**Final Summary:**

Ran the parity check. With natabula's policy passed as flags, `tools/update-adopters.mjs` plans the same wave as `wave-bump.sh`, against a provisional `v8.2.0` in a scratch clone (the whole fleet sits on v8.1.0, the newest real tag). Both a clean Migration block and one that asks gave identical `repo → class` plans across all 24 participating repos (`diff` exit 0 both times). fakeneuron was skipped as attended in both tools, and ahead of the migration gate. No divergence turned up, so the updater is unchanged. No real tag, adopter file or HEAD changed (before/after snapshot diff exit 0). Release half re-scoped at 🛠️ (operator: option A): the minor cut follows this commit via `/ft-release` on its own row.

- **Changed files:** `.flaitron/PLAN.md` (`.7` re-scoped, then stub-flipped), this note (archived).
- **Verification:** receipt above.
- **Refactors:** none.
- **Doc verdict:** no change across the 18 AI-referenced docs.
- **`touches:` reconciliation:** declared `.flaitron/PLAN.md` + the two updater files (conditional on a divergence, which didn't happen); diff = `.flaitron/PLAN.md` + this note. The updater paths went unused, as planned for the no-divergence branch.
- **Maintainability:** NAT-494 can wrap the updater knowing the selection plans match. The apply-path follow-through is covered by `.4`/`.5` fixtures, not by this run.

**Archived:** 2026-11-01

