---
title: attended-ledger-guard
status: completed
tags: [fleet, pin-bump, updater]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.3, NAT-470]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
---

# CORE-852.2 | attended-ledger-guard

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-852]] [[CORE-852.1]] [[CORE-852.3]]

## 🎯 Goal

Add a repeatable `--attended-ledger <relpath>` flag to `tools/update-adopters.mjs` so an adopter that tracks any named path is skipped as attended, with a suggested owner-task line, instead of being bumped.

## ✅ Acceptance

- [x] `parseArgs` accepts repeatable `--attended-ledger <relpath>`, rejects a missing/`--`-prefixed value and an absolute path (widened at review: empty, `.`, and root-escaping values too) — `node --test tools/update-adopters.test.mjs`
- [x] A would-bump adopter tracking a named ledger path skips with `attended ledger` in the reason and a suggested owner-task line naming the path and `<from> → <to>`; an untracked (or merely present-on-disk) path does not trip it (refined at review: tracked = committed blob at HEAD, matched literally) — `node --test tools/update-adopters.test.mjs`
- [x] CLI dry-run prints the skip line plus the suggestion line, counts it as skipped — `node --test tools/update-adopters.test.mjs`
- [x] Header doc + `USAGE` name the flag; no fleet path (`brand-evidence`, `reviewed.json`) appears in the tool — `grep -q -- '--attended-ledger' tools/update-adopters.mjs && ! grep -qE 'brand-evidence|reviewed\.json' tools/update-adopters.mjs`
- [x] Syntax checks and drift checks pass — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs && bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `parseArgs`: `attendedLedgers: []`, repeatable flag with value + relative-path validation; extend `USAGE`
- [x] `checkAdopter(adopter, latest, { attendedLedgers })`: gate after missing-pinned-tag, before migration-bearing; `git ls-files --error-unmatch` per path; skip with `suggestion`
- [x] `reportResult`: print the suggestion as an indented line under the ⏭ row; `main` threads the option
- [x] Header: usage line + gate bullet
- [x] Tests: parseArgs (repeatable, errors), checkAdopter (tracked → skip; untracked file on disk → bump; current repo unaffected), CLI dry-run line; update the existing `parseArgs` deepEqual expectations

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.1]] — Discovery; behaviour matrix row "Reviewed-evidence ledger" (predecessor)
- [[CORE-852.3]] — selection and gate flags (follow-up; sequential after this)
- natabula NAT-470 — the `wave-bump.sh` ledger skip this generalises (context, cross-repo)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Still needed: the updater today would bump fakeneuron and turn its `brand:check-pin` CI red (matrix row "Reviewed-evidence ledger"). Scope is S and matches the PLAN line.

- [x] Read relevant source files — `tools/update-adopters.mjs` (all), `tools/update-adopters.test.mjs` (structure, fixtures `makeAdopter`/`runCli`, parseArgs + checkAdopter + dry-run CLI groups), natabula `scripts/wave-bump.sh:353-360` (the NAT-470 ledger gate)

- [x] **Best Practices Review** — the gate is one more inline sequential gate in `checkAdopter` (CORE-479 kept them inline); policy arrives as a flag, so the Engine tier stays fleet-agnostic. Option passed as a third `checkAdopter` arg, defaulted, so existing callers/tests stay valid.

- [x] **Archive skim** — covered by CORE-852.1's skim of the same file (CORE-490.3, CORE-419.3, CORE-827, CORE-486, CORE-479); CORE-419.4 sets the `--root` value-validation pattern (missing or `--`-prefixed → usage error) this flag reuses.

- [x] **Drift check** — PLAN line matches `.1`'s locked decision ("generic policy flags … `--attended-ledger <relpath>`"; skip + suggested owner-task line, filing stays the operator's). wave-bump checks `git ls-files --error-unmatch` (tracked, not merely present) and orders the ledger gate before the Migration check — mirrored here. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) "tracking" = `git ls-files --error-unmatch` succeeds at the adopter root; (2) the gate fires only on the would-bump path (a current/drift repo needs no ledger refresh), placed after the missing-pinned-tag guard and before the migration gate, matching wave-bump's order; (3) the suggestion is one indented line under the ⏭ row, shaped `suggested owner task: bump flaitron <from> → <to> and refresh <paths> (attended review)`; (4) absolute paths are a usage error (exit 2); (5) skip reason lists every matched path.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- `parseArgs` tests use `deepEqual` on the whole args object; adding `attendedLedgers` changes those expectations (intended, not a regression).
- `ls-files --error-unmatch` exits 1 on an unmatched path; any other code is a real git failure and rethrows (CORE-366 pattern).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing shapes: `--root`'s value validation (CORE-419.4) for the flag; one more inline sequential gate in `checkAdopter` (CORE-479); the `staged-diff` gate's exit-1-only catch (CORE-366) for `ls-files --error-unmatch`; existing fixture groups (`makeAdopter`, `runCli`) for tests.

- [x] **Minimal refactor gate** — no refactor; only the gate-list comment's count ("Nine" → "Ten") was touched, since it names the gates.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `parseArgs` → `attendedLedgers: []`; `--attended-ledger <relpath>` repeatable, rejects missing / `--`-prefixed / absolute (usage error, exit 2). `USAGE` names it.
- `trackedLedgers(repo, ledgers)` helper; `checkAdopter(adopter, latest, { attendedLedgers = [] } = {})` gates after missing-pinned-tag, before migration-bearing. Skip reason `attended ledger tracked (<paths>) — its owner bumps and refreshes it in one task`; `suggestion` field `suggested owner task: bump flaitron <from> → <to> and refresh <paths> (attended review)`.
- `reportResult` prints the suggestion as `      ↳ …` under the ⏭ row; `main` threads `args.attendedLedgers`.
- Header: usage line + gate bullet (states the caller supplies paths; no fleet paths in the tool).
- Tests (+9 after review): parseArgs repeatable/order, parseArgs bad-value rejections (empty, absolute, `.`, root-escaping) and missing/`--` value, checkAdopter tracked → skip with suggestion (second unmatched path ignored), untracked-on-disk → bump, directory/glob/`:(glob)` values → bump (literal), staged-only → staged-changes skip, current repo unaffected, CLI dry-run skip row + suggestion line + summary counts. Existing parseArgs `deepEqual` expectations gained `attendedLedgers: []`.

- Review fix (Phase 2 re-entry): `trackedLedgers` moved from per-path `ls-files --error-unmatch` (index, pathspec magic) to one `git --literal-pathspecs ls-tree -z --full-tree HEAD -- <paths>` call matching exact blob paths — what the owner's CI sees.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → exit 0 (88/88; 79 before this task's +9)
- `grep -q -- '--attended-ledger' tools/update-adopters.mjs && ! grep -qE 'brand-evidence|reviewed\.json' tools/update-adopters.mjs` → exit 0
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs && bash tools/drift-checks.sh` → exit 0 (every check `ok`)
- Lint: the updater has no linter beyond `node --check` (zero-dep script); covered above.
- Structural: no duplication (one helper), no dead code, header + `USAGE` current.
- **External review** (`/code-review medium`, working-tree diff), 7 findings:
  1. Empty / `..` values reach git, exit 1 instead of usage exit 2 — **blocker** (Acceptance "rejects … bad values") → fixed: `normalize`-based rejection + tests.
  2. Value read as pathspec (dir / glob / `:` magic over-match) — **blocker** (Acceptance "tracking a named path") → fixed: `--literal-pathspecs ls-tree`, exact blob match + test.
  3. Ledger gate after detached-HEAD / pinned-ahead / missing-tag hides the ledger on first run — **note**, no change: those gates must clear before a bump suggestion's `<from> → <to>` is sound; matches wave-bump's order (not-main before ledger).
  4. Index vs HEAD — **note** → fixed by (2)'s HEAD read; staged-only case pinned by a test.
  5. N×M git spawns — **note** → fixed: one `ls-tree` per adopter.
  6. "current" test vacuous — **note**, no change: it fails if the gate moves above the `current === latest` return, which is the regression it guards.
  7. Comment reflow — **note**, no change: inserting a gate name forces re-wrapping the sentence; already rewrapped to neighbour width.
  Phase 3 re-ran from the top after the fixes (receipts above are the re-run).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change. `git grep` finds no `.md` that enumerates the updater's flags; `.6` owns the `docs/` updater sweep.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the literal-pathspec point is recorded in the helper's comment, where `.3`'s `--only` work will read it

**Final Summary:**

Added a repeatable `--attended-ledger <relpath>` to `tools/update-adopters.mjs`. A would-bump adopter that tracks any named path as a committed file at HEAD (matched literally, so no globs or pathspec magic) now skips as attended. It prints a `↳ suggested owner task: bump flaitron <from> → <to> and refresh <paths> (attended review)` line, and filing that task stays the operator's job. The gate runs after the missing-pinned-tag guard and before the migration gate. Empty, absolute or root-escaping values are a usage error (exit 2). The tool names no fleet path; natabula passes fakeneuron's ledger path.

- **Changed files:** `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, plus workflow bookkeeping (`.flaitron/PLAN.md`, this note).
- **Verification:** receipt above; 88/88 tests, syntax checks and drift checks exit 0.
- **Refactors:** none (gate-count comment updated to name the new gate).
- **Doc verdict:** no change across the AI-referenced set.
- **`touches:` reconciliation:** declared the two `tools/` files; `git diff --name-only` = those two + PLAN/this note (bookkeeping) — matches.
- **Maintainability:** fleet policy stays a caller flag; one git spawn per adopter regardless of ledger count.

**Archived:** 2026-10-31
