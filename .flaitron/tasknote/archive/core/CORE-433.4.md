---
title: validation roster sync
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-433, CORE-430.N, CORE-422]
---

# CORE-433.4 | validation roster sync

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-433]] [[CORE-430.N]] [[CORE-422]]

## 🎯 Goal

Sync `claude/skills/ft-release/SKILL.md` Step 6 with CI's `node --check` commands, then add a mirror pair covering the validation roster's 5 sites so the release gate cannot silently lag CI again.

## ✅ Acceptance

- [x] `/ft-release` Step 6 fence names all six `AGENTS.md` §"Validation" commands, including both `node --check`s, using the AGENTS command forms
- [x] `/ft-release` §7.1 encodes Pair H covering the five roster sites from CORE-430.N F2 (presence of all six commands)
- [x] Pair H also diffs AGENTS.md §Validation fences against `.github/workflows/ci.yml` `run:` steps (excluding the `npm --prefix viz ci` install), so CI cannot silently reorder or drop a command
- [x] `docs/CONVENTIONS.md` names both `--check` file paths and no longer claims "exactly one place"
- [x] Pair H returns clean at HEAD after the sync; a negative test (injected miss) is recorded
- [x] CORE-435 (F1 duplication rationale) stays out of scope

## 🧩 Subtasks

- [x] Sync `claude/skills/ft-release/SKILL.md` Step 6 fence to the six AGENTS commands (order + forms)
- [x] Tighten `docs/CONVENTIONS.md` §"GitHub Actions CI" to name both `--check` paths and rewrite the "exactly one place" sentence
- [x] Add Pair H to `claude/skills/ft-release/SKILL.md` §7.1 after Pair G
- [x] Verify presence + CI-verbatim clean at HEAD; negative-test an injected miss
- [x] Re-run Pairs F and G (no regression)

## 🔗 Related

- [[CORE-EPIC-433]] — parent epic: drift blind spots
- [[CORE-430.N]] — audit that surfaced this finding
- [[CORE-422]] — roster mirror-pair gate (the pattern this task extends)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-430.N F2 is still true at HEAD — Step 6 omits both `node --check`s and CONVENTIONS compresses them to "two syntax checks"; Pair F/G (CORE-433.3) established the §7.1 shape this roster still lacks.

- [x] Read relevant source files — `AGENTS.md` §Validation, `.github/workflows/ci.yml`, `docs/CONVENTIONS.md` §"GitHub Actions CI", `.flowtron/tasknote/README.md` §"Project quick commands", `claude/skills/ft-release/SKILL.md` Step 6 + §7.1 Pairs A–G, archived CORE-430.N / CORE-433.3 / CORE-422 / CORE-420.5. No probe — five sites, enumerable.

- [x] **Best Practices Review** — extend the existing §7.1 mirror-pair block (Pair F is the closest analog: presence across N prose/YAML/fence shapes, not byte-identity). N/A beyond pattern survey; no code module boundaries.

- [x] **Archive skim** — `CORE-430.N` F2 *is* this task; `CORE-433.3` deferred it as complementary and shipped Pair F/G; `CORE-422`/`CORE-420.5` established the pair-block shape and the Codex-wrapper-needs-no-fan-out precedent; `CORE-438.1` noted this child also edits §7.1 and said whichever lands second rereads first (438 landed; §7.1 reread — Pairs A–G present).

- [x] **Drift check** — PLAN cites `ft-release/SKILL.md:238-239`; those lines still hold the two-line fence omitting both `--check`s. Five sites still match CORE-430.N's list. SPEC.md does not mention the validation roster (no contract contradiction). CORE-435 owns F1 (hooks-vs-CI rationale), not this sentence.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **SSOT:** `AGENTS.md` §"Validation" two fences (6 commands: 3 viz + `node --test` + 2 × `node --check`).
- **5 sites (CORE-430.N F2):** AGENTS.md (canonical), `.github/workflows/ci.yml:20-25`, `docs/CONVENTIONS.md:54` (prose), `.flowtron/tasknote/README.md:66-73`, `claude/skills/ft-release/SKILL.md:238-239`.
- **HEAD presence probe** (6 command strings × 5 files): CONVENTIONS misses both `--check` paths; ft-release misses `npm --prefix viz test` (has `run test`) and both `--check`s. AGENTS / CI / README already name all six. CI-verbatim diff vs AGENTS fences (excluding `npm --prefix viz ci`) is already clean.
- **Pair H design:** (1) presence loop across all 5 sites for the 6 AGENTS command strings — formats differ (YAML `run:`, prose, bullets, semicolon-joined), so not byte-identity; (2) CI-verbatim `diff` of AGENTS §Validation fences vs ci.yml `run:` steps minus the install step — encodes CORE-430.N's "verbatim and in the same order" claim. `grep -F` is sufficient (commands are not `--`-prefixed). `node --check tools/update-adopters.mjs` is not a substring of the `.test.mjs` form, so no false-positive.
- **CONVENTIONS rewrite is in-scope:** presence requires naming both `--check` paths (currently "its two `node --check` syntax checks"); replacing "exactly one place" with "AGENTS.md is SSOT; the other four are gated mirrors" is the same F2 sentence, not CORE-435.
- **Carve-outs:** `npm --prefix viz ci` (CI install) and `npm --prefix viz run dev` (README quick command) are not roster members. Codex `ft-release` is a pointer wrapper — no fan-out (CORE-422).
- **No clarifications needed.** Assume presence not byte-identity for the three non-CI restatements; Step 6 adopts AGENTS command forms and order (`test` not `run test`; test → typecheck → lint).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed Pair F/G shape in `ft-release` §7.1: bold header, rationale, fenced `sh` block, resolution rule. Presence half special-cases Step 6 via `awk` range because the check's own command list lives in the same file.

- [x] **Minimal refactor gate** — none; Step 6 fence sync + CONVENTIONS sentence rewrite + one additive pair block. No refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown + release-gate prose); verification is the encoded shell commands.

**Implementation Notes:**

- `claude/skills/ft-release/SKILL.md` Step 6 — fence now lists all six AGENTS commands in AGENTS/CI order (`test` not `run test`; both `node --check`s). Prose names the updater syntax checks.
- `docs/CONVENTIONS.md` §"GitHub Actions CI" — both `--check` file paths named; "exactly one place" rewritten to "AGENTS.md is SSOT; the four restatements are release-gated mirrors."
- `claude/skills/ft-release/SKILL.md` §7.1 — Pair H after Pair G. Presence loop over 4 files + Step 6 `awk` extract; CI-verbatim `diff` of AGENTS fences vs ci.yml `run:` minus install. Step 6 scoping is load-bearing: the impl `--check` string appears at Step 6:243, Pair H heredoc:494, and Pair H prose:498 — a whole-file grep would never fail.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34/34 pass** (release machinery touched)

- [x] Ran lint/type-check on changed code — `node --check` clean on both updater files; markdown N/A for typed lint

- [x] **Quality assertions** — no duplication beyond the deliberate 6-command restatement the pair exists to bind; Step 6 awk-scope avoids a self-matching false negative; no new public API; CORE-435 (F1) untouched.

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Pair H presence at HEAD → **no output**.
- Pair H CI-verbatim at HEAD → **no output, exit 0**.
- Negative: Step 6 extract with both `--check` lines stripped → `MISSING VALIDATION CMD ft-release Step 6` for both paths.
- Negative: CONVENTIONS without `--check` file paths → both `MISSING VALIDATION CMD docs/CONVENTIONS.md`.
- Negative: CI drops `node --check tools/update-adopters.mjs` → `diff` `-` line for that command.
- Pairs F and G re-run → both clean (no regression).
- Updater suite 34/34; `node --check` clean on both files.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 16 entries walked; `docs/CONVENTIONS.md` updated (this task); all others no change. See Final Summary.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested under the active `CORE-EPIC-433`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Synced `/ft-release` Step 6 to the six `AGENTS.md` §"Validation" commands (both `node --check`s were missing, so the release gate was narrower than CI) and encoded Pair H so the five roster sites cannot silently diverge again. CONVENTIONS no longer claims "exactly one place"; AGENTS.md is the SSOT and the four restatements are gated mirrors.

**Changed files:** `claude/skills/ft-release/SKILL.md` (Step 6 fence + Pair H), `docs/CONVENTIONS.md` (command list + SSOT sentence). No code.

**Verified:** Pair H presence and CI-verbatim clean at HEAD; negatives fire on stripped `--check`s (Step 6, CONVENTIONS) and a dropped CI step; Pairs F/G still clean; updater suite 34/34; `node --check` clean on both updater files.

**Refactors:** none. Step 6 `awk` range is a check-design constraint, not a code refactor.

**Doc-drift sweep (16 entries):**
- `README.md` — no change
- `AGENTS.md` — no change (SSOT already named all six)
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — **updated** (named both `--check` paths; rewrote "exactly one place")
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change

Out-of-list deliverable: `claude/skills/ft-release/SKILL.md` (lazy-loaded; houses Step 6 + Pair H).

**Maintainability:** a release cut that drops a validation command now fails Pair H instead of shipping a narrower gate than CI.

**Archived:** 2026-08-12

