---
title: pin-bump-tool-merge audit
status: completed
tags: [audit, fleet, pin-bump]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.2, CORE-852.3, CORE-852.4, CORE-852.5, CORE-852.6, CORE-852.7]
touches:
  - SPEC/scope-boundaries.md
---

# CORE-852.N | pin-bump-tool-merge audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-852]]

## 🎯 Goal

Verify the completed `CORE-EPIC-852` (`pin-bump-tool-merge`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. — all 18 entries "no change" (Phase 4 sweep); the one stale line found sits in `SPEC/scope-boundaries.md`, outside the set, fixed inline
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `node --test tools/update-adopters.test.mjs` → 122/122; `bash tools/drift-checks.sh` → 0
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-852` (Step 5), landing in the audit's closure commit — no miss large enough for a row; one inline fix
- [x] Single `feat: CORE-852.N — audit CORE-EPIC-852` (or `chore: ...` if no code edits land) commit lands — `chore:` (markdown-only fix)
- [x] PLAN.md line for `CORE-852.N` flipped to stub form `Completed 2026-11-01.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-852.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-852.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.1]] … [[CORE-852.7]] — the cohort audited here
- [[CORE-853]] — fence-aware Workflow replace, parked out of `.6`'s review (closed 2026-11-01)
- [[CORE-854]] — release v8.2.0 that shipped the cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-852` active under its priority section; `.1`–`.7` all `[x]`; `.N` the only open child

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-852.N`; Step 2 pre-flight passed with no open siblings (no early audit). Cohort closed 2026-10-31 (`.1`–`.5`) and 2026-11-01 (`.6`, `.7`), then shipped in v8.2.0 (CORE-854, `6954ca82`) together with CORE-853.

- [x] Read relevant source files — all seven archived cohort notes in full; `tools/update-adopters.mjs` header (usage, Not covered), `USAGE`, gate list, `WIRING_SURFACES`; `SPEC.md:758-772`; `SPEC/scope-boundaries.md:26-38`; `SECURITY.md` §"Fleet updater"; `docs/MIGRATION.md:574`; `docs/VISION.md:22`; `claude/AGENTS-snippet.md:76-82`; `codex/AGENTS-snippet.md:18-21`; `claude/skills/ft-update/SKILL.md` fence rule; `docs/EXTERNAL-AGENTS.md` stable-surface table

- [x] **Best Practices Review** — N/A: verification pass, no new code surface

- [x] **Archive skim** — self-referential (the cohort is the archive). Beyond it: CORE-853 (`70824c96`, fence-aware heading match in both the tool and `/ft-update` Step 3.5, +tests) closes `.6`'s parked note; CORE-490.3 is superseded by `.4` (YAML `supersedes:`)

- [x] **Drift check** — every path the cohort cites resolves at HEAD; the header gate list says "Fifteen" and names 15 gates in `checkAdopter` order; `USAGE` and the header usage block list the same eight flags; `git grep` for the retired contract phrases (`gitlink-only`, `pure gitlink`, "wiring repair", the old new-skill flag) finds only the header's CORE-490.3 history line and SECURITY.md's "never passes `--no-verify`"

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: archived cohort notes are historical records and are not rewritten for style (AGENTS.md §"Editing Rules")

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Cohort deliverables:
- **`.1`** — re-scoped CORE-852 into the epic; behaviour matrix (updater vs `wave-bump.sh`); four locked decisions (epic shape, hooks-run commit + full rollback, parity in both tool and `/ft-update`, generic policy flags).
- **`.2`** — `--attended-ledger <relpath>` (repeatable; HEAD blob, literal match) + suggested owner-task line; no fleet path in the tool.
- **`.3`** — `--target`, `--only`, `--branch`, `--accept-migration`; `.gitmodules` submodule path; uninitialised skip row; `--literal-pathspecs` (SECURITY.md, MIGRATION.md).
- **`.4`** — dirty-tracked gate; `Pinned to:` + `## Workflow` follow-through; `--trailer`; hooks run (no `--no-verify`), rollback of every written path (supersedes CORE-490.3).
- **`.5`** — skill-link create/prune on present surfaces, Codex per `codex/reconcile-skills.md`, fork pass-gap skip + drift note; retired the "run /ft-update to wire" flag; header "Not covered" rewritten.
- **`.6`** — `/ft-update` Step 3.5 + tracked prune + clean-tree gate; carve-out wording in `SPEC.md` and `SPEC/scope-boundaries.md`; snippet / MIGRATION / WORKTREES / README sweep.
- **`.7`** — parity dry runs (24 repos, primary + negative, `diff` exit 0 both); release handed to `/ft-release` (CORE-854, v8.2.0).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass; the inline fix rewords an existing paragraph to match `SECURITY.md` §"Fleet updater"'s already-current phrasing ("latest release or `--target <tag>`", "path from `.gitmodules`, default `.flaitron/core`")

- [x] **Minimal refactor gate** — one stale clause rewritten; nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only fix

**Implementation Notes:**

Coherence findings:
1. **Fixed inline** — `SPEC/scope-boundaries.md:31,34`: the carve-out said the updater moves each pin "to the latest non-breaking release" and writes "the `.flaitron/core` gitlink". Both went stale in `.3` (`--target`; path from `.gitmodules`), and `.6` rewrote the paragraph without catching them. Now "the latest non-breaking release or a named `--target`" and "the flaitron submodule gitlink (`.flaitron/core` unless `.gitmodules` says otherwise)", matching `SECURITY.md`. `SPEC.md:762`'s shorter carve-out names neither, so it is still accurate.
2. **Noted, no change** — the updater header's first lines (`:2` "to the latest release", `:8` "the .flaitron/core submodule pin") are the summary; the Selection and Submodule-path paragraphs right below qualify both. They are fine as a summary.
3. **Noted, no change** — nav-chip style parity: archived `.2`, `.6`, `.7` carry a hand-written `✅ Completed` chip; `.1`, `.3`–`.5` keep `🟢 In progress`. The chip has been render-derived since CORE-042.4, and archived notes are not rewritten.
4. **Noted, no change** — the updater's CLI flags are now a cross-repo dependency (natabula NAT-494 wraps them), but `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" covers orchestration callers reading PLAN/tasknotes, not CLI wrappers. The flags' contract lives in the header + `USAGE`. No row was moved or retired, so the README's same-closure caller-row rule does not fire.
5. **Accepted residuals** (from `.6`, confirmed still documented): an untracked retired link the updater keeps but reconcile-skills unlinks is named in the header's "Not covered"; a hook-rejected `/ft-update` Step 5 commit leaves the staged bump (pre-existing, recorded in `.6`). The fence-aware heading residual is closed by CORE-853.
6. **Maintainability flag, not filed** — `claude/skills/ft-update/SKILL.md` is at 30,715 / 33,000 bytes. `.6` recommends extracting Step 3.5 + the prune into a lazy fragment on the next substantial edit. Not a defect in this cohort, and filing it here would hold the parent open on unrelated work.
7. **Cross-repo, operator's** — `.1`'s follow-up (repoint NAT-494's "CORE-852's release" citation to the v8.2.0 release) belongs to a natabula session; not edited here.

Misses filed as child rows: none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (regression check over the cohort's code surface)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `bash tools/drift-checks.sh` is the markdown gate

- [x] **Verification receipt** — receipts in Testing Notes

- [x] **External review** — N/A: a two-clause wording fix that matches the already-reviewed `SECURITY.md` phrasing; no executable diff

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → exit 0, 122/122 (18 suites; 120 at `.5` + CORE-853's 2)
- `bash tools/drift-checks.sh` → exit 0, every check `ok` (after the inline fix)
- `wc -c SPEC/scope-boundaries.md` → 5,996 (5,915 before)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (`:312` carve-out pointer, `:340` versioning line from `.6`, both current) · `AGENTS.md` no change (validation commands unchanged) · `SPEC.md` no change (`:762` carve-out current) · `docs/MIGRATION.md` no change (`:574` names every new skip, the follow-through, and the `.gitmodules` path) · `claude/AGENTS-snippet.md` no change (`snippetLinks()` / `codexRoster()` match the code) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change (§"Fleet updater" current, already the reference phrasing) · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (finding 4) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (`:22` carve-out pointer current). Outside the set: `SPEC/scope-boundaries.md` updated (finding 1)

- [x] Closed — Acceptance ticked or annotated, YAML `status: completed`, PLAN.md `.N` line → `Completed 2026-11-01.` stub, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A for the always-loaded layer. Note: a child that rewrites a paragraph (`.6`) should re-read the whole paragraph against earlier siblings' changes, not just the clause it came to edit

**Final Summary:**

Audited the pin-bump-tool-merge cohort (`.1`–`.7`). It holds together: one updater now owns the fleet bump, `/ft-update` writes the same files, and the docs describe the shipped contract. The only drift was one stale clause in `SPEC/scope-boundaries.md`'s carve-out ("latest non-breaking release", "`.flaitron/core` gitlink"), which predated `.3`'s `--target` and `.gitmodules` work. It is fixed inline to match `SECURITY.md`. No misses filed, so this closure flips the parent.

- **Changed files:** `SPEC/scope-boundaries.md` (carve-out wording), `.flaitron/PLAN.md` (`.N` stub + parent flip), this note (archived).
- **Verification:** updater suite 122/122; drift checks exit 0.
- **Refactors:** none.
- **Doc verdict:** 18/18 AI-referenced docs no change; `SPEC/scope-boundaries.md` (outside the set) updated.
- **`touches:` reconciliation:** declared `SPEC/scope-boundaries.md`; diff = that + bookkeeping (PLAN, note) — matches.
- **Maintainability:** carve-out prose now agrees across `SPEC.md`, `SPEC/scope-boundaries.md`, and `SECURITY.md`. Open flags, not filed: the ft-update body is near its budget (finding 6), and NAT-494's citation repoint is natabula's (finding 7).

**Archived:** 2026-11-01
