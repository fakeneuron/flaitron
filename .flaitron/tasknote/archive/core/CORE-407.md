---
title: ft-update-prune-check
status: completed
tags: []
created: 2026-08-03
due:
related-tasks: []
---

# CORE-407 | ft-update-prune-check

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a report-only dangling-symlink check to `/ft-update`'s bump flow so adopters see retired-skill symlinks that need pruning without having to read `docs/MIGRATION.md`.

## ✅ Acceptance

- [x] `claude/skills/ft-update/SKILL.md`'s bump flow includes a report-only dangling-symlink check that runs after symlink re-wiring (Step 4), scoped to whichever wiring surfaces (`.claude/`, `.agents/skills/`) are actually present
- [x] The check reuses the detection command already documented in `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" so both surfaces stay consistent
- [x] `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" updated to reflect that detection is now automated by `/ft-update` (pruning remains manual — the adopter runs `rm`)
- [x] Doc-drift sweep confirms no other AI-referenced doc needs updating

## 🧩 Subtasks

- [x] Add a new "Step 4.6 — Dangling symlink check" to `claude/skills/ft-update/SKILL.md`, between the existing Step 4.5 (Audit-fork drift scan) and Step 5 (Smoke check), following the same non-blocking-report voice as Step 4.5
- [x] Report hits per surface (or "No dangling symlinks found") — do not auto-`rm`; the adopter prunes
- [x] Update `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" prose to say detection is now automated by `/ft-update`, pruning is still manual
- [x] Sanity-check the `find` command against this repo (dry run) to confirm syntax/output shape
- [x] Doc-drift sweep over `.flowtron/tasknote/README.md` §"AI-referenced docs" for any other doc describing `/ft-update`'s steps (e.g. `claude/commands/ft-update.md`)

## 🔗 Related

- [[CORE-390]] — added the manual `find` detection command + retired-skills table this task now wires into `/ft-update` itself
- [[CORE-392]] — first symlink retirement (`ft-quality`) that motivated the manual doc note

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Well-scoped, matches an explicitly documented gap (`docs/MIGRATION.md` §"Retired skills leave dangling symlinks" already says "this cleanup is manual"). No design ambiguity — the detection command to reuse is already written and documented.

- [x] Read relevant source files

- [x] **Best Practices Review** — touched responsibility is `/ft-update`'s bump flow (Step 4 symlink-wiring area, `claude/skills/ft-update/SKILL.md`). No dependency-direction concerns (markdown-only skill, no code). Existing abstraction to extend: Step 4.5 "Audit-fork drift scan" already establishes the non-blocking-warning report pattern for this exact skill — the new check should mirror that voice rather than invent a new one. No refactor needed beyond a new step insertion.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-390.md` (`debug-mode-fold`) is the origin of the manual `find` command + retired-skills table in `docs/MIGRATION.md`; it explicitly deferred automation ("`/ft-update` wires symlinks for *newly shipped* skills; it does not prune retired ones, so this cleanup is manual"). `CORE-392.md` (`ft-quality-retire`) is the first retirement that motivated the doc note. Neither blocks this task; both confirm scope and the command to reuse.

- [x] **Drift check** — `claude/skills/ft-update/SKILL.md` verified current at read time (Steps 0-5 as read, 159 lines); `codex/skills/ft-update/SKILL.md` is a thin wrapper delegating to the Claude SKILL.md, so no separate Codex edit is needed. No SPEC contract conflict — `SPEC.md` §"What flowtron does NOT provide" bars shell scripts, not inline bash in skill prose, and the skill already runs bash inline throughout. Matches the PLAN.md line exactly; no divergence.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) the new check lands as "Step 4.6" between the existing Step 4.5 and Step 5, since it's a natural continuation of the symlink-wiring work in that section; (2) it scans only wiring surfaces that are actually present, mirroring Step 4's own per-surface presence checks; (3) it reuses the exact `find` command already documented in `docs/MIGRATION.md` rather than inventing new detection logic, so the two stay consistent; (4) `docs/MIGRATION.md` needs a small prose update to say detection is now automated even though pruning stays manual.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Precedent pattern for a non-blocking, per-surface report already exists in the same file (Step 4.5), so the new step is additive, not novel — same "scan → report if any hits → proceed regardless" shape.
- The `find` one-liner in `docs/MIGRATION.md` (`find .claude .agents/skills -type l ! -exec test -e {} \; -print`) errors if either directory is absent; the new step must scope the command to only the surfaces confirmed present in Step 4, same as Step 4 already does for wiring.
- Codex is out of scope for a direct edit — `codex/skills/ft-update/SKILL.md` just says "Read and follow `../../../claude/skills/ft-update/SKILL.md`," so the new step propagates there automatically.
- Verified the `find` command errors if a scanned directory is absent (tested `.agents/skills` missing in this repo → `No such file or directory`), confirming subtask 2 must scope the command per-surface, matching Step 4's own presence checks. Scoped to `.claude` alone, the command runs clean with exit 0 and (correctly) zero hits in this repo today.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing Step 4.5 "non-blocking warning report" shape (scan → report hits or "none found" → proceed regardless) rather than inventing a new report style. No new abstraction introduced.

- [x] **Minimal refactor gate** — no refactor; pure insertion of one new step plus three description-string touch-ups that had gone stale the moment the new step existed. N/A beyond that.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A; `/ft-update` is a markdown-instruction skill with no executable test surface (per `SPEC.md` §"What flowtron does NOT provide" — no shell scripts). Verified correctness by dry-running the actual `find` command against this repo instead (see Testing Notes).

**Implementation Notes:**

- `claude/skills/ft-update/SKILL.md`: inserted "Step 4.6 — Dangling symlink check" between Step 4.5 (Audit-fork drift scan) and Step 5 (Smoke check). Scans only the wiring surfaces Step 4 confirmed present, reuses the exact `find` one-liner from `docs/MIGRATION.md`, reports hits with a non-blocking `⚠️` warning (mirrors Step 4.5's format) or "No dangling symlinks found," and explicitly states `/ft-update` never runs `rm` itself.
- `claude/skills/ft-update/SKILL.md` frontmatter `description:` — added "report any dangling symlinks left by retired skills" to keep the dispatch summary accurate.
- `claude/commands/ft-update.md` — frontmatter description + body prose both updated to mention the new report-only check, keeping the wrapper's step summary in sync with the skill.
- `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" — reworded the lead paragraph ("`/ft-update` wires symlinks for *newly shipped* skills; it does not prune retired ones, so this cleanup is manual" → now notes Step 4.6 reports dangling ones automatically, pruning still manual) and reframed the `find` command as "what `/ft-update` uses" / a manual fallback for out-of-band checks, rather than the only way to detect them.
- No code changes — this is a prose-only skill; `codex/skills/ft-update/SKILL.md` needed no edit since it delegates to the Claude file by reference.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no executable surface (markdown-only skill). Substituted a real dry-run of the exact `find` command against this repo (see Discovery Notes) before writing it into the skill, confirming syntax and per-surface scoping behavior.

- [x] Ran lint/type-check on changed code — N/A, no lint tooling covers `claude/skills/*/SKILL.md` prose in this repo (confirmed no root `package.json`/markdownlint config).

- [x] **Quality assertions** — no duplication introduced (the new step explicitly reuses the `docs/MIGRATION.md` `find` command rather than re-deriving it); no dead code; no unexplained complexity (mirrors the existing Step 4.5 shape); no unnecessary public-surface growth (one new step, three description touch-ups, all necessary to keep the skill's own self-description accurate); no stale code-facing documentation left behind — `docs/MIGRATION.md` was the one doc making a now-false claim ("this cleanup is manual" for detection) and it's fixed.

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Dry-run: `find /Users/fakeneuron/Code/flowtron/.claude -type l ! -exec test -e {} \; -print` → exit 0, zero hits (no dangling symlinks in flowtron-self today, as expected). Confirmed the command errors (`No such file or directory`) when a scanned directory is absent, which is why the new step scopes to only the surfaces Step 4 confirmed present, rather than always running both `find` invocations.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 11 default cold-start docs in `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (only a passing `/ft-update` mention, unaffected)
  - `SPEC.md` — no change (only a passing `/ft-update` mention, unaffected)
  - `docs/MIGRATION.md` — **updated** §"Retired skills leave dangling symlinks" — reworded to say `/ft-update` Step 4.6 now reports dangling symlinks automatically; the `find` command is now framed as "what `/ft-update` uses" / manual fallback, not the only detection path
  - `claude/AGENTS-snippet.md` — no change; its `/ft-update` summary line is intentionally terse and already omits Step 4.5 (audit-fork drift scan) at the same granularity, so omitting Step 4.6 too is consistent, not drift
  - `codex/AGENTS-snippet.md` — no change; same terseness precedent, and Codex delegates to the Claude SKILL.md by reference anyway
  - `docs/CONVENTIONS.md` — no change (unrelated submodule-philosophy mention)
  - `CONTRIBUTING.md` — no change (no `/ft-update` mention)
  - `SECURITY.md` — no change (no `/ft-update` mention)
  - `docs/AGENT-NEUTRALITY.md` — no change (no `/ft-update` mention)
  - `docs/PLATFORMS.md` — no change; lists `/ft-update` only as a named skill in wiring-surface tables, no step-level detail to drift
  - `claude/CAPABILITIES.md` — no change (no `/ft-update` mention)
  - `docs/AGENT-COMPAT.md` — no change (no `/ft-update` mention)
  - Also updated (not in the default sweep list, but directly describes the changed behavior): `claude/commands/ft-update.md` frontmatter + body, and `claude/skills/ft-update/SKILL.md` frontmatter `description:`

- [x] Closed — every Acceptance criterion ticked (see below); YAML `status:` flipped to `completed`; PLAN.md line will be flipped to stub form and moved to `## Completed`; tasknote moved to archive in the same commit.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

`/ft-update`'s bump flow now includes a new report-only "Step 4.6 — Dangling symlink check" in `claude/skills/ft-update/SKILL.md` (between the existing Step 4.5 audit-fork drift scan and Step 5 smoke check), so adopters see retired-skill symlinks surfaced during a bump instead of only discovering them by reading `docs/MIGRATION.md`.

**Files changed:**
- `claude/skills/ft-update/SKILL.md` — +21 lines (new Step 4.6) + 1-word frontmatter description touch-up
- `claude/commands/ft-update.md` — frontmatter description + body prose updated to mention the new check
- `docs/MIGRATION.md` — §"Retired skills leave dangling symlinks" lead paragraph reworded to reflect automated detection (pruning still manual)

**Verification:** No executable test surface exists for this markdown-instruction skill (`SPEC.md` §"What flowtron does NOT provide" — no shell scripts). Verified correctness by dry-running the actual `find` command against this repo (0 hits, exit 0) and confirming it errors on an absent directory (`.agents/skills` doesn't exist here), which is why the new step scopes per-surface rather than always scanning both.

**Refactors:** None — pure additive insertion reusing the existing Step 4.5 non-blocking-report pattern; no duplication, no new abstraction.

**Documentation verdict:** 1 of 12 AI-referenced docs updated (`docs/MIGRATION.md`); 11 verified unaffected — sibling summary docs (`claude/AGENTS-snippet.md`, `docs/PLATFORMS.md`, etc.) already omit step-level detail at this granularity (they don't itemize Step 4.5 either), so leaving them untouched is consistency, not drift. Two docs outside the default sweep (`claude/commands/ft-update.md`, the SKILL.md frontmatter) were also updated since they directly describe the changed behavior.

**Maintainability effect:** Closes a gap the project's own docs flagged as a known limitation since CORE-390 ("this cleanup is manual"). Adopters now get dangling-symlink visibility for free on every bump instead of needing to remember a manual `find` command from `docs/MIGRATION.md`.

**Archived:** 2026-08-03
