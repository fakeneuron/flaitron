---
title: pin-bump-tool-merge
status: completed
tags: [planning, handoff, fleet, pin-bump]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-852, CORE-852.N, NAT-494]
touches:
  - .flaitron/PLAN.md
---

# CORE-852.1 | pin-bump-tool-merge discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-852]] [[CORE-852.N]] [[NAT-494]]

## 🎯 Goal

Scope the merge of natabula `wave-bump.sh` into `tools/update-adopters.mjs` and file the epic's implementation children `.2..7` in PLAN.md, each carrying the decisions locked in Phase 1.

## ✅ Acceptance

- [x] Six implementation children `.2..7` filed nested under CORE-EPIC-852, before `.N` — `grep -cE '^  - \[ \] \*\*CORE-852\.[2-7]\*\*' .flaitron/PLAN.md` prints `6`
- [x] Every child line ≤70 words with a `[model]` token and `| shortname` — `judgment` — word counts recorded in Implementation Notes
- [x] The four locked decisions (epic shape, commit rule, `/ft-update` parity, generic policy flags) each reach the child that implements them — `judgment` — mapping recorded in Implementation Notes
- [x] `## 🌳 Fan-out` records the order (`.2` ships first; the rest sequential, one file) — `grep -q '^## 🌳 Fan-out' .flaitron/tasknote/CORE-852.1.md`
- [x] Drift checks pass on the PLAN edit — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] Draft the `.2..7` child lines from the proposed shape + locked decisions
- [x] Insert them between `.1` and `.N` in PLAN.md
- [x] Add `## 🌳 Fan-out`
- [x] Run `bash tools/drift-checks.sh`
- [x] Note for the operator: natabula NAT-494's row cites "CORE-852's release" — repoint to CORE-852.7 in natabula's own session (cross-repo; not edited here)

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic (re-scoped from plain CORE-852 in this note's Phase 1)
- [[CORE-852.N]] — terminal audit
- [[NAT-494]] — natabula half: rewrite `scripts/wave-bump.sh` as a thin wrapper; blocked by this epic's release (follow-up, cross-repo)
- [[CORE-852.2]] — attended-ledger guard (child; sequential, first)
- [[CORE-852.3]] — selection and gate flags (child; sequential after .2)
- [[CORE-852.4]] — follow-through + commit contract (child; sequential after .3)
- [[CORE-852.5]] — wiring and forks (child; sequential after .4)
- [[CORE-852.6]] — `/ft-update` parity + SPEC carve-out (child; sequential after .5)
- [[CORE-852.7]] — parity run + release (child; sequential after .6)

## 🌳 Fan-out

- **Sequential:** [[CORE-852.2]] first · [[CORE-852.3]] after .2 · [[CORE-852.4]] after .3 · [[CORE-852.5]] after .4 · [[CORE-852.6]] after .5 · [[CORE-852.7]] after .6 — `.2..5` all edit `tools/update-adopters.mjs` and its test file, and `.6` mirrors the behaviour `.4`/`.5` settle, so nothing is parallel-safe
- **Synthesis:** [[CORE-852.N]] (audit; no extra parent synthesis task)
- natabula NAT-325 (wave-bump committed), NAT-470 (reviewed-ledger skip); fakeneuron FE-137 — context
- [[CORE-490.3]] — `--no-verify` on the bump commit; its rationale is what the follow-through port breaks (predecessor)
- [[CORE-827]] — retired the updater's migrate mode (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The matrix below confirms the starter's own trigger ("several task cycles → promote as an epic"): one S guard, two M ports with a commit-contract conflict between them, a `/ft-update` parity question, a SPEC carve-out rewording and a release. Operator confirmed. PLAN line `CORE-852` → parent `CORE-EPIC-852` + `.1` (this note, renamed from `CORE-852.md`) + `.N`; the plain ID retires unarchived (CORE-196 precedent). `.1` keeps `[heavy]` rather than `/ft-open-epic`'s `[frontier]` default for a heavy epic's `.1`: the design work already ran on heavy here, and what remains is filing.

- [x] Read relevant source files — `tools/update-adopters.mjs` (all 872 lines), natabula `scripts/wave-bump.sh` (all 425), `scripts/discover-fleet.sh`, `scripts/lib/participation.sh`, natabula's `/natabula-align` skill (its Bump wave section), `claude/skills/ft-update/SKILL.md`, `SPEC/scope-boundaries.md`, `SPEC.md` carve-out.

- [x] **Best Practices Review** — the updater is a zero-dep standalone Node script with nine inline sequential gates (CORE-479 deliberately left them inline) and a rollback window around every mutation (CORE-419.3). The port adds writes to adopter files beyond the gitlink, which changes two of its load-bearing contracts (pathspec gitlink-only commit, `--no-verify`) — see matrix "conflict" rows. Fleet policy (participation list, `main`-only, fakeneuron's ledger path) must arrive as flags, keeping the Engine tier free of fleet knowledge. Duplication being retired: wave-bump's `migration_ask` already says it "mirrors" `migrationBearingTags`.

- [x] **Archive skim** — 214 of 1093 `archive/core/` notes mention `update-adopters`. Load-bearing: **CORE-490.3** (`--no-verify` justified as "pure gitlink move — nothing for hooks to lint"; failure fixtures use `prepare-commit-msg` because `--no-verify` skips `pre-commit`); **CORE-419.3** (rollback window, fixture-side fault injection); **CORE-827** (migrate mode retired); **CORE-486** (CLI + viz are the only cross-project carve-outs, reciprocal pointers); **CORE-196** (precedent: a starter re-scoped in Phase 1 into an epic, with the note as the filing vehicle).

- [x] **Drift check** — paths hold; three drifts in the starter's claims:
  1. `SPEC.md:756` → the carve-out now sits at `SPEC.md:762` (and `SPEC/scope-boundaries.md:29`, unchanged). Neither file uses the phrase "singular script exception"; that phrase lives only in the updater's own header (`:4`).
  2. The starter says the updater "checks symlink wiring … and scans audit forks for drift". It does neither: it only **flags** a range that ships a new per-project-wired skill ("run /ft-update"), and its header (`:90-94`) lists wiring and audit-fork scans as "Not covered (by design)".
  3. Unknown #2 ("how much follow-through `/ft-update` already does") — answered: `/ft-update` wires missing links on all four surfaces, prunes only exact-owned retired **Codex** links (via `codex/reconcile-skills.md`) and reports other dangling links, warns on fork drift and copies new pass files on a per-file confirm. It does **not** rewrite the `Pinned to:` line or replace the AGENTS.md `## Workflow` block — those two are wave-only today, so porting them into the batch tool alone would open the same divergence in the other direction.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — four asked, all answered with the recommended option (see "Locked decisions")

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Behaviour matrix — `update-adopters.mjs` (U) vs `wave-bump.sh` (W).** Class: shared · U-only · W-only · **conflict**.

| Behaviour | U | W | Class |
|---|---|---|---|
| Discovery | one-level `readdir`, fixed `.flaitron/core`, skips flaitron | recursive `discover-fleet.sh` (worktree dedup), `.gitmodules` url→path, needs `.flaitron/PLAN.md` | shared core; W richer |
| Participation | — | `filter_participating` (natabula list) | W-only, fleet policy |
| Target tag | latest (`FLAITRON_UPDATE_LATEST` test seam) | `--target TAG` | W-only |
| `--only REPO` | — | yes; unmatched name → SKIP row | W-only |
| Uninitialised submodule | not discovered (silent) | SKIP row | W-only |
| Version read | `**Version:**` regex | `sed -n 3p` | shared (U stricter) |
| Detached HEAD | skip | (inside not-main) | shared |
| Not on `main` | — | skip | W-only, fleet policy |
| Dirty tracked files | — (index + submodule only) | skip | W-only; **required** once follow-through edits AGENTS.md/README |
| Staged index / dirty submodule | skip | skip | shared |
| Pinned-ahead, missing pinned tag, gitlink drift (both directions) | skip / report | — | U-only |
| Migration-bearing range | skip | skip (same algorithm, "mirrors" U) | shared |
| `--accept-migration TAG` | — | yes, validated before any repo read | W-only |
| Reviewed-evidence ledger | — (would bump fakeneuron, CI red) | skip `reviewed.json` (NAT-470) | W-only → generic `--attended-ledger` |
| Fork pass-file gap | — | skip | W-only |
| Fork drift | — | `[step 7 review]` note | W-only |
| New-skill wiring | flag only | create links from snippet `ln -s` (Codex too, naive parse) | W-only write; Codex rule diverges from `/ft-update`'s `reconcile-skills.md` |
| Dangling links | — | prune tracked links into submodule; keep untracked/foreign | W-only; `/ft-update` prunes Codex-only |
| `Pinned to:` line | — | rewrite | W-only (not in `/ft-update`) |
| AGENTS.md `## Workflow` | — | replace from claude snippet (skip symlink / >1 heading) | W-only (not in `/ft-update`) |
| Fetch | 30 s timeout | untimed | U better |
| Post-checkout verify | SPEC.md + canonical SHA | — | U-only |
| Commit | pathspec gitlink-only, `--no-verify` | all staged paths, hooks run, `--trailer` | **conflict** |
| Failure | rollback submodule + unstage, ✗, exit 1 | leave staged, reported, exit 0 | **conflict** |
| Exit codes | 0 / 1 / 2 | 0; usage 1 | **conflict** |
| Output | `✓ ⚠ ⏭ ⬆ ✗` lines + summary | fixed-width table + `Next:` hint | differ; operator-read only |

**Commit-contract conflict.** CORE-490.3 justified `--no-verify` as "pure gitlink move — nothing for hooks to lint". Once the commit carries the `Pinned to:` line and AGENTS.md edits, that no longer holds — adppro's pin-check hook is precisely a hook that validates them, and natabula's Bump wave step 5 forbids `--no-verify`. The port must pick a hook and failure rule.

**Scope-boundary note.** `SPEC/scope-boundaries.md:29` frames the carve-out as maintaining "the fleet *around* flaitron-adopting projects, not the workflow inside one". Writing an adopter's AGENTS.md Workflow block reaches inside; the carve-out wording must say so explicitly (starter already lists it).

**Proposed epic shape (if Re-scope is confirmed).** `CORE-852` → parent `CORE-EPIC-852`; this note becomes `CORE-852.1` (Discovery; deliverable = filed children). Children, ordered:
- `.2` [moderate] attended-ledger guard — repeatable `--attended-ledger <relpath>`, skip + suggested owner-task line; ships first.
- `.3` [heavy] selection & gate flags — `--target`, `--only`, `--branch <name>`, `--accept-migration`, uninitialised-submodule SKIP row, `.gitmodules` path resolution.
- `.4` [heavy] follow-through + commit contract — dirty-tracked gate, `Pinned to:` line, Workflow block, hook rule, rollback widened to every written path, `--trailer`.
- `.5` [heavy] wiring + forks — create missing links, prune tracked dangling links, Codex via `reconcile-skills.md` rules, fork pass-gap skip + drift note.
- `.6` [moderate] `/ft-update` parity + SPEC carve-out wording + header "Not covered" rewrite.
- `.7` [moderate] release (minor) + dry-run parity check over `~/Code` against `wave-bump.sh` (fakeneuron "attended" in both).
- `.N` audit.

**Locked decisions (operator, 2026-10-31):**

| Question | Decision |
|---|---|
| Epic shape | Re-scope to CORE-EPIC-852; this note is `.1`, children `.2..7` + `.N` |
| Commit rule | Hooks always run (no `--no-verify`); any failure, a hook's included, rolls back every written path + submodule + index, reports ✗ with the hook's first line, exits 1. Supersedes CORE-490.3's rationale once follow-through lands |
| Parity | `Pinned to:` line, Workflow-block replace and dangling-link prune go into **both** the tool and `/ft-update` |
| Policy | Generic flags only (`--branch <name>`, `--only <repo>`, `--attended-ledger <relpath>`); natabula passes its policy; flaitron carries no fleet paths |

**Assumptions carried from the starter's leans (not asked):** a ledger skip prints a suggested owner-task line, and filing stays the operator's act; `wave-bump.sh` becomes a thin wrapper then retires (NAT-494's call); natabula pins the minimum flaitron version the `.7` release produces; the Workflow-block replace keeps W's guard (skip on a symlinked AGENTS.md or more than one `## Workflow` heading).

> **Starter context (preserved verbatim, filed 2026-10-31):**
>
> Source: Grok Task Notes/Flaitron pin-bump tool merge starter tasknote.md (2026-10-29), read at flaitron@120a4bdacb890df14c8f1e868371d87f53c4f986
>
> **Format / planning / scope:** Codemaster filed it; planning first — no pushes, tags, releases or cross-repo commits without Jude's explicit approval for each change. This is the Flaitron half; the Natabula half (`wave-bump.sh` wrapper, `/natabula-align`, `docs/CI-HEALTH.md`) is natabula **NAT-494**, blocked by this task's release.
>
> **Why this exists:** Two tools batch-bump `.flaitron/core` pins across `~/code` and have to be kept in sync by hand. Done means **one** implementation: Flaitron ships it, and Natabula's `/natabula-align` bump wave calls it with fleet policy flags rather than re-implementing it.
>
> **Feasibility:** Feasible, **M**, about 3–4 tasks across two repos. caobunga-private has no bump script (bumps by hand with `/ft-update`; CBN-111 delegates pin freshness to `/natabula-align`). fakeneuron CI step "Reviewed Flaitron gitlink" (`.github/workflows/ci.yml:70`) runs `npm run brand:check-pin`, requiring `content/brand-evidence/flaitron/reviewed.json` `revision` and `content/brand-evidence/flaitron/<sha>/` to match the gitlink. Since NAT-470 `wave-bump.sh` skips any repo tracking that ledger; no tool refreshes it, deliberately (semantic review).
>
> **Execution plan (guidance):** (1) Phase 1 behaviour matrix; (2) S: generic repeatable `--attended-ledger <relpath>` guard + tests, shipped first; (3) M: port Pinned-to line, dangling-link prune, Workflow-block replace, `--accept-migration`, not-main skip, named-path staging, fixtures mirroring natabula `scripts/wave-bump.test.sh`; (4) S: release in a Flaitron minor (Jude approves); (5) NAT-494 wraps; (6) checks: `node --test tools/update-adopters.test.mjs`, `bash tools/drift-checks.sh`, `just check`, dry run over `~/code` matching `wave-bump.sh`, fakeneuron "attended" in both. Several cycles → promote as an epic.
>
> **Out of scope:** automatic refresh of fakeneuron's reviewed evidence; the v8 pin bump (landed: natabula `2adf0b3`, caobunga `c48e7c7`, v8.1.0); the Natabula wrapper (NAT-494); pushing any adopter.
>
> **Discovery leans (evidence, not locked):** Owner → Flaitron upstream. Fleet policy → passed from Natabula (ledger paths, participation). `wave-bump.sh` → thin wrapper for one release, then retire. Ledger handling → skip + print a suggested FE task line; filing stays the operator's act.
>
> **Open at promotion:** Workflow-block replace in the batch tool or only `/ft-update`? (lean: the tool, behind the one-heading/not-a-symlink guard). Natabula pins a minimum Flaitron version for the wrapper? (lean: yes, step 4's release).
>
> **Ties to preserve:** `/natabula-align`'s report axes and one-confirm wave; CBN-111's reliance on align; `/ft-update` stays the single-repo path (caobunga uses it); fakeneuron's `brand:check-pin` contract.
>
> **Related:** NAT-494; synergy study (Drive `1erEub8yAkNL0U1TJO0cDN_d0OlqtPQdd`) §2 "Duplication 1"; NAT-325, NAT-470; FE-137.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-EPIC-850's cohort shape (children nested 2-space under the parent, between `.1` and `.N`) and `SPEC/tasknote-inserts.md`'s Fan-out shape

- [x] **Minimal refactor gate** — N/A: PLAN rows + this note only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no code

**Implementation Notes:**

- Filed `.2..7` between `.1` and `.N` in PLAN.md. Description word counts: .2 45 · .3 42 · .4 52 · .5 53 · .6 45 · .7 40 (cap 70).
- Decision → child mapping: **epic shape** → the cohort itself; **commit rule** (hooks run, full rollback, supersedes CORE-490.3) → `.4`, with `.5` placed inside `.4`'s rollback window; **parity** → `.6` (`claude/` + `codex/` `/ft-update` bodies); **generic policy flags** → `.2` (`--attended-ledger`) and `.3` (`--only`, `--branch`, `--target`, `--accept-migration`).
- Starter-lean assumptions placed: suggested owner-task line → `.2`; Workflow-block guard → `.4`; parity dry run with fakeneuron "attended" in both → `.7`.
- Codex wiring in `.5` follows `codex/reconcile-skills.md` rather than W's naive `ln -s` parse — matrix row "New-skill wiring" divergence.
- `.6`'s `docs/` sweep: `README.md`, `docs/VISION.md`, `docs/MIGRATION.md`, `docs/CODEX-VERIFICATION.md` mention the updater today (`docs/VERSION-HISTORY.md` is history, left alone).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: no code changed

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: planning-only markdown (PLAN rows + this note), no executable diff to grade; the filed rows are graded by each child's own Phase 1 drift check and by `.N`

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -cE '^  - \[ \] \*\*CORE-852\.[2-7]\*\*' .flaitron/PLAN.md` → exit 0, prints `6`
- `grep -q '^## 🌳 Fan-out' .flaitron/tasknote/CORE-852.1.md` → exit 0
- `bash tools/drift-checks.sh` → exit 1 on first run (`pair_q FAILED`: `MISSING FILE .flaitron/tasknote/CORE-852.1.md — .claude/skills/natabula-align/SKILL.md §"Bump wave"` — a cross-repo file cited in `path §"Section"` form resolves against this repo); reworded the citation as prose → exit 0, every check `ok`
- Word counts and decision mapping: Implementation Notes (judgment criteria)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change. Planning-only: no behaviour these docs describe has moved yet; `.6` owns the SPEC/doc updates.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.1` line → `Completed 2026-10-31.` stub nested under CORE-EPIC-852, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A: the `pair_q` cross-repo citation trip is already enforced by the check itself

**Final Summary:**

Promoted the CORE-852 starter and re-scoped it in Phase 1 into **CORE-EPIC-852** (operator-confirmed): this note became `.1`, and `.2..7` + `.N` are filed. Phase 1 built the `update-adopters.mjs` vs `wave-bump.sh` behaviour matrix. It found three starter drifts: the carve-out moved from `SPEC.md:756` to `:762`; the updater does not do wiring or fork scans; and `/ft-update` lacks the pin-line and Workflow-block steps. It also found a commit-contract conflict (`--no-verify` + rollback vs hooks + leave-staged). Four decisions locked: epic shape; hooks run with full rollback (supersedes CORE-490.3 at `.4`); follow-through in both the tool and `/ft-update` (`.6`); generic policy flags (`.2`, `.3`).

- **Changed files:** `.flaitron/PLAN.md` (CORE-852 row → epic cohort of 8 rows), `.flaitron/tasknote/CORE-852.md` → `archive/core/CORE-852.1.md` (promoted, renamed, archived).
- **Verification:** receipt above; drift checks exit 0 after one `pair_q` fix.
- **Refactors:** none.
- **Doc verdict:** no change across the AI-referenced set.
- **`touches:` reconciliation:** declared `.flaitron/PLAN.md`; diff = `.flaitron/PLAN.md` + this note's rename/archive (the note itself is workflow bookkeeping) — matches.
- **Maintainability:** one engine planned instead of two drifting ones; the matrix in Discovery Notes is the reference each child drift-checks against.
- **Operator follow-up (cross-repo, not done here):** natabula NAT-494's row cites "CORE-852's release" — repoint to CORE-852.7 from a natabula session.

**Archived:** 2026-10-31
