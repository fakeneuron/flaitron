---
title: self-symlink-sweep
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-389.3, CORE-390, CORE-392]
---

# CORE-394 | self-symlink-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-389.3]] [[CORE-390]] [[CORE-392]]

## 🎯 Goal

Remove flowtron-self's own dangling `.claude/` symlinks left behind by CORE-389.3 / CORE-390 / CORE-392's retirements, mirroring the adopter cleanup recipe already documented in `docs/MIGRATION.md`.

## ✅ Acceptance

- [x] `find .claude -type l ! -exec test -e {} \; -print` from repo root returns nothing (zero dangling symlinks left in flowtron-self's own `.claude/` tree)
- [x] Exactly the 14 known-dead symlinks removed (7 in `.claude/skills/`, 7 mirrored in `.claude/commands/`, all pointing at `ft-audit-{backend,frontend,security,performance,docs}` / `ft-debug` / `ft-quality`) — no collateral removal of live symlinks
- [x] `git status --porcelain` shows no diff from the 14 removals (`.claude/` is gitignored per-machine symlink state — confirmed via `.gitignore:16`) and no other repo state touched

## 🧩 Subtasks

- [ ] Remove the 7 dangling symlinks in `.claude/skills/`
- [ ] Remove the 7 mirrored dangling symlinks in `.claude/commands/`
- [ ] Re-run the `find` sweep to confirm zero dangling symlinks remain in `.claude/`
- [ ] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-389.3]] — deleted the 5 `ft-audit-{backend,frontend,security,performance,docs}` skill bodies, leaving their self-tree symlinks dangling
- [[CORE-390]] — folded `ft-debug` into `/ft-task --debug`, dangling its self-tree symlinks
- [[CORE-392]] — retired `ft-quality`, dangling its self-tree symlinks and explicitly surfacing this cleanup as a follow-up ("not actioned")

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Purely mechanical cleanup surfaced explicitly as an unactioned follow-up in [[CORE-392]]'s closure recap ("this task adds two more [dangling symlinks]... Operator-side cleanup outside the repo"). No design tradeoff, no contested scope — just executing the sweep the three prior retirements deferred.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A`. No code or module boundary touched; this is deleting dead symlinks (pointers into git-removed directories), not editing logic. No abstraction to preserve, no dependency direction to reason about.

- [x] **Archive skim** — `grep -l "dangling\|self-tree\|self-symlink"` across `archive/core/*.md` hit CORE-390, CORE-391, CORE-392 (the three retirements that caused the dangle) plus CORE-204/217/219 (unrelated symlink-convention setup, not cleanup). CORE-390 created `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" with the adopter-facing `find` detection recipe; CORE-392's recap is the one that explicitly flagged flowtron-self's own tree as unswept and out of scope for that task.

- [x] **Drift check** — task line says "7 dangling symlinks in `.claude/skills/`"; confirmed live via `find`: exactly 7 (`ft-audit-{backend,frontend,security,performance,docs}`, `ft-debug`, `ft-quality`), all pointing at directories `git rm`'d by [[CORE-389.3]] / [[CORE-390]] / [[CORE-392]]. One scope note: the same 7 retirements also left **7 mirrored dangling symlinks in `.claude/commands/`** (e.g. `ft-quality.md -> ../../claude/commands/ft-quality.md`) that the task line doesn't name — the adopter recipe in `docs/MIGRATION.md` scans `.claude` (both `skills/` and `commands/`) together, and flowtron-self's own tree is the same shape, so leaving `commands/` unswept would defeat the sweep's purpose. No SPEC contradiction; this is a same-fix widening, not a redirection — proceeding without a scope-deviation gate.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: scope includes the mirrored `.claude/commands/` dangling set (14 total removals), since it's the same underlying cleanup the PLAN line describes, just under-counted to the `skills/` half.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Confirmed via `find .claude .agents -type l ! -exec test -e {} \; -print` (flowtron-self has no `.agents/` dir) — 14 hits total:

| Skill | `.claude/skills/` | `.claude/commands/` | Retired by |
|---|---|---|---|
| `ft-audit-backend` | dangling | `ft-audit-backend.md` dangling | [[CORE-389.3]] |
| `ft-audit-frontend` | dangling | `ft-audit-frontend.md` dangling | [[CORE-389.3]] |
| `ft-audit-security` | dangling | `ft-audit-security.md` dangling | [[CORE-389.3]] |
| `ft-audit-performance` | dangling | `ft-audit-performance.md` dangling | [[CORE-389.3]] |
| `ft-audit-docs` | dangling | `ft-audit-docs.md` dangling | [[CORE-389.3]] |
| `ft-debug` | dangling | `ft-debug.md` dangling | [[CORE-390]] |
| `ft-quality` | dangling | `ft-quality.md` dangling | [[CORE-392]] |

No `.codex/skills/` mirror exists in this repo, so no Codex-side dangling set to sweep.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed `docs/MIGRATION.md` §"Retired skills leave dangling symlinks"' own recipe (`find` to detect, `rm` to clean) against flowtron-self's own tree instead of an adopter's. No new shape needed.

- [x] **Minimal refactor gate** — `N/A`, no refactor; pure deletion of dead symlinks.

- [x] Implemented the minimal solution — `rm` on the 7 `.claude/skills/` symlinks and their 7 mirrored `.claude/commands/*.md` symlinks (14 total, listed in Discovery Notes)

- [x] Updated/added tests for non-trivial behavior — `N/A`, no test-bearing code touched

**Implementation Notes:**

`rm .claude/skills/{ft-audit-backend,ft-audit-frontend,ft-audit-security,ft-audit-performance,ft-audit-docs,ft-debug,ft-quality}` and the matching `rm .claude/commands/{...}.md` — all were symlinks into the submodule pointing at directories already `git rm`'d by [[CORE-389.3]] / [[CORE-390]] / [[CORE-392]], so removal is safe per `docs/MIGRATION.md`'s own note ("these are symlinks into the submodule, never real files").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no test-bearing code touched (symlink deletions only)

- [x] Ran lint/type-check on changed code — `N/A`, same reason

- [x] **Quality assertions** — `find .claude -type l ! -exec test -e {} \; -print` from repo root now returns nothing (was 14 hits before Phase 2). `git status --porcelain` shows only the untracked `CORE-394.md` tasknote — zero diff from the 14 removals, confirming `.claude/` is gitignored per-machine state (`.gitignore:16`) and no collateral repo change occurred. No dead code, duplication, or stale docs introduced.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 8 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs": **no change**. This task only removes local gitignored symlinks in flowtron-self's own `.claude/`; the retirements themselves (and their doc updates — `docs/MIGRATION.md` §"Retired skills leave dangling symlinks", roster counts, etc.) were already handled by [[CORE-389.3]] / [[CORE-390]] / [[CORE-392]].

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and moved to top of `## Completed` (standalone task); tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Swept flowtron-self's own `.claude/` tree of dangling symlinks left behind by three prior retirements ([[CORE-389.3]], [[CORE-390]], [[CORE-392]]), applying the same detect-and-remove recipe those tasks documented for adopters in `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" — closing the follow-up CORE-392's recap explicitly flagged as unactioned.

**Changed:** 14 symlinks deleted, all local/gitignored (`.claude/` per `.gitignore:16`) — no tracked files touched: 7 in `.claude/skills/` (`ft-audit-backend`, `ft-audit-frontend`, `ft-audit-security`, `ft-audit-performance`, `ft-audit-docs`, `ft-debug`, `ft-quality`) + 7 mirrored `.md` symlinks in `.claude/commands/`.

**Verification:** `find .claude -type l ! -exec test -e {} \; -print` went from 14 hits to 0. `git status --porcelain` shows zero diff from the removals (gitignored state) plus this tasknote's own PLAN/archive edits.

**Scope note:** the PLAN.md line named only the 7 `.claude/skills/` symlinks; Discovery found the same three retirements left 7 mirrored dangling symlinks in `.claude/commands/`, so this task swept 14 total rather than 7. Not a Re-scope — same fix, same cause, just under-counted in the filing.

**Refactors:** none — mechanical deletion only.

**Documentation verdict:** all 8 AI-referenced docs unaffected — the retirements' own doc updates already landed in [[CORE-389.3]] / [[CORE-390]] / [[CORE-392]]; this task only cleaned local per-machine symlink state.

**Maintainability effect:** flowtron-self's own dev environment now matches the adopter cleanup recipe it documents — no stale slash commands resolving to deleted skill bodies when driving flowtron's own tasknotes.

**Archived:** 2026-08-02
