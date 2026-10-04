---
title: glyph-emitter-propagation
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-353, CORE-353.1, CORE-353.3]
---

# CORE-353.4 | glyph-emitter-propagation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-353]]

## 🎯 Goal

Roll the new `[medium]🧩` glyph (locked by CORE-353.3's contract) through every post-closure next-move + copy-paste cue emitter and ticket-filing label mention across the 13 `claude/skills/**` files plus `SPEC/procedures/ft-task.md` — mechanical propagation, no new decisions.

## ✅ Acceptance

- [ ] All 13 `claude/skills/**` files identified in `.1` Discovery's inventory (`ft-audit-backend`, `ft-audit-performance`, `ft-close-epic`, `ft-audit-repo`, `ft-audit-docs`, `ft-audit-frontend`, `ft-audit-security`, `ft-audit`, `ft-epic-discovery`, `ft-release`, `ft-micro-task`, `ft-worktree-start`, `ft-task`) reviewed against the `.3` contract; each either updated to the three-valued glyph set or confirmed as needing no change (with the reason logged)
- [ ] `SPEC/procedures/ft-task.md` (agent-neutral SOP mirror) updated to match `claude/skills/ft-task/SKILL.md`'s new three-valued text
- [ ] `ft-task/SKILL.md`'s residual "binary… nearer glyph… no third glyph" text (flagged as expected transient lag in `.3`'s Implementation Notes) rewritten to the 1:1 tier-mirror rule
- [ ] No new decisions made — glyph char (🧩), label (`MEDIUM`), prose ("moderate"), and firing rule (1:1 tier mirror) all inherited verbatim from `.3`
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Grep-confirm the 13-file set matches `.1`'s inventory (done in Discovery)
- [x] Edit the 6 ticket-filing "primary labels" mentions (ft-audit-backend, ft-audit-performance, ft-audit-docs, ft-audit-frontend, ft-audit-security, ft-audit) — add `[medium]🧩`
- [x] Edit ft-audit-repo's already-three-valued "Tag effort per line" — add 🧩 to the bare `[medium]`
- [x] Edit the 6 candidate-line + copy-paste emitters (ft-close-epic, ft-epic-discovery, ft-micro-task, ft-worktree-start, ft-task) — three-valued glyph set, rewritten firing rule
- [x] Confirm ft-release's fixed 🧠 re-entry cue needs no change (constant, not candidate-derived) — log reason
- [x] Edit SPEC/procedures/ft-task.md to mirror the ft-task SKILL.md rewrite
- [x] Markdown mental-pass across all touched files; grep sweep confirming no residual "binary"/"nearer glyph"/"no third glyph" language remains
- [ ] Phase 4: doc-drift sweep + flip PLAN.md line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-353]] — parent epic (refresh-model-roster)
- [[CORE-353.1]] — Discovery; inventoried the 13-file emitter set this task propagates through
- [[CORE-353.3]] — contract; defines the glyph char, label, prose, and firing rule this task rolls out mechanically

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line matches `.1`'s filed scope exactly — mechanical propagation of `.3`'s locked contract through the 13 pre-inventoried skill files + the SOP mirror. No new decisions to make.

- [x] Read relevant source files (`.3`'s Implementation Notes for the exact contract text; `SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph" post-`.3`; `SPEC.md` post-closure protocol post-`.3`; all 13 `claude/skills/**` files grepped for 🔧/🧠; `SPEC/procedures/ft-task.md`)

- [x] **Archive skim** — `.1` (inventoried the 13-file + SOP set, confirmed codex tree is glyph-neutral and out of scope) and `.3` (locked glyph=🧩, label=MEDIUM, prose="moderate", firing rule=1:1 tier mirror; explicitly deferred emitter propagation to this task; flagged `ft-task/SKILL.md`'s binary text as expected transient lag).

- [x] **Drift check** — grepped `claude/skills/*/SKILL.md` for 🔧/🧠 and got exactly 13 hits, matching `.1`'s inventoried count. No drift; no new files added or removed since `.1`.

- [x] Asked clarifying questions — No clarifications needed. The glyph char, label, prose, and firing rule are all locked by `.3`; this task is pure mechanical text propagation with one judgment call (below) that doesn't rise to a structured ask.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### The 13-file set, categorized by pattern

Grepped `claude/skills/*/SKILL.md` for 🔧/🧠: exactly 13 files, matching `.1`'s inventory. Three distinct patterns:

1. **Ticket-filing "primary labels" (6 files)** — `ft-audit-backend:67`, `ft-audit-performance:70`, `ft-audit-docs:66`, `ft-audit-frontend:68`, `ft-audit-security:67`, `ft-audit:79`. All share identical text: `(primary labels `[heavy]🧠` / `[light]🔧` recommended; ...)`. This describes which `[model]` tag to write when filing a *new* PLAN.md ticket — distinct from post-closure next-move suggestion, but still an inventoried glyph emitter per `.1`, and SPEC.md:164's task-line-format table already lists three bare-bracket primary labels (`[heavy]`/`[medium]`/`[light]`, added by `.2`) without emoji — these 6 files are the emoji-decorated echo of that table and are now missing the `[medium]🧩` option.
2. **Already-three-valued, missing the glyph (1 file)** — `ft-audit-repo:73`: `` `[heavy]🧠` ... / `[light]🔧` ...; `[medium]` where it genuinely fits.`` — structurally three-valued already, just needs 🧩 attached to the bare `[medium]`.
3. **Candidate-line + copy-paste next-move emitters (5 files + the SOP mirror)** — `ft-close-epic:194,199`, `ft-epic-discovery:239,240`, `ft-micro-task:123`, `ft-worktree-start:129`, `ft-task/SKILL.md:151,152`, and `SPEC/procedures/ft-task.md:197-198,205-210`. These are the real post-closure next-move-suggestion + copy-paste-cue behavior `.3`'s contract targets. `ft-task/SKILL.md:151` still carries the pre-`.3` "binary… nearer glyph… no third glyph" language verbatim — `.3` flagged this as expected transient lag, to be fixed here.

**Reviewed, no change needed (1 file):** `ft-release/SKILL.md:89-93` uses a fixed 🧠 for its own self re-entry cue (`/ft-release` re-invoking itself after the context-budget escape hatch) — this is a constant (releases are always heavy-tier work), not a candidate-derived glyph selection, so it's not part of the three-valued propagation. Confirmed by reading the full re-entry section: no `[model]`-tag branching logic present.

### Judgment call

Whether the 6 ticket-filing "primary labels" mentions (pattern 1) count as in-scope "post-closure next-move + copy-paste cue emitters" per the task's literal wording, given they're actually filing-time labels, not next-move suggestions. Resolved as **in scope**: `.1`'s Discovery explicitly inventoried these same 13 files together as "13 claude/skills glyph emitters" (its wording, not narrowed to post-closure-only), and leaving them at two options while SPEC.md's own task-line-format table already lists three would be exactly the kind of doc-drift `.3`'s contract exists to prevent. No structured ask — low-stakes, mechanical, reversible, and matches the pre-existing inventory scope.

### Gate judgment (Phase 1→2)

Discovery surfaced no significant deviation → **skip 🛠️**. Zero clarifying asks; the file set, edit pattern, and firing rule are all fully determined by `.1`'s inventory and `.3`'s contract. The single judgment call above is a scope-confirmation, not a re-scope or de-scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `.3`'s Implementation Notes gave the exact target text for each of the three patterns (ticket-filing labels, ft-audit-repo's already-three-valued line, candidate+copy-paste emitters); no new shape needed, pure text propagation of an existing, already-designed contract.

- [x] Implemented the minimal solution — 12 `claude/skills/**` files + `SPEC/procedures/ft-task.md` edited (13 total surfaces changed; `ft-release/SKILL.md` reviewed and confirmed as needing no change — see below).

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only propagation edits; no executable surface).

**Implementation Notes:**

**Edits landed, by pattern:**

1. **Ticket-filing "primary labels" (6 files)** — `ft-audit-backend:67`, `ft-audit-performance:70`, `ft-audit-docs:66`, `ft-audit-frontend:68`, `ft-audit-security:67`, `ft-audit:79`. Each: `(primary labels `[heavy]🧠` / `[light]🔧` recommended; ...)` → `(primary labels `[heavy]🧠` / `[medium]🧩` / `[light]🔧` recommended; ...)`.
2. **ft-audit-repo:73** — added 🧩 to the already-three-valued bare `[medium]`: `... / `[light]🔧` (mechanical, clear-diff); `[medium]🧩` where it genuinely fits.`
3. **Candidate-line + copy-paste emitters (5 files):** `ft-close-epic:194,199`, `ft-epic-discovery:239,240`, `ft-micro-task:123`, `ft-task/SKILL.md:151,152` — candidate-line pattern rewritten to `[heavy]🧠` / `[medium]🧩` / `[light]🔧` + "design / moderate / mechanical" prose; copy-paste helper rewritten to `🔧 for [light] ...; 🧩 for [medium] ...; 🧠 for [heavy] ...` with `<glyph>` now `🔧/🧩/🧠`. `ft-task/SKILL.md:151` additionally lost the pre-`.3` "binary… nearer glyph… no third glyph" language (flagged by `.3` as expected transient lag), replaced with the 1:1 tier-mirror rule.
4. **ft-worktree-start:129** — the `${GLYPH}` substitution rule extended from binary (🧠/🔧) to three-valued (🧠/🧩/🔧).
5. **SPEC/procedures/ft-task.md:197-198,205-210** — SOP mirror of `ft-task/SKILL.md`'s post-closure protocol steps 2-3, rewritten to match.
6. **ft-release/SKILL.md:89-93 — reviewed, no change.** Its 🧠 is a fixed constant for `/ft-release`'s own self re-entry cue after the context-budget escape hatch (releases are inherently heavy-tier; there's no per-candidate `[model]`-tag branching here), not part of the three-valued candidate-glyph propagation. Confirmed by reading the full re-entry section — no branching logic present to extend.

**Verification:** grep swept `claude/skills/` + `SPEC/procedures/ft-task.md` for residual `nearer glyph` / `no third glyph` / `is a **binary**` — zero hits. Cross-checked every file containing 🔧 also now contains 🧩 (except `ft-release/SKILL.md`, which correctly has neither 🔧 nor the candidate-glyph logic).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; prose-only SKILL.md/SPEC edits, no executable surface (no viz/parser code touched — that's `.6`'s scope).

- [x] Ran lint/type-check on changed code — no markdown linter configured (`ls package.json` → none). `git status --short` confirms exactly the intended 13 files changed, no stray edits. Markdown mental-pass: backtick pairing, emoji spacing, and prose grammar checked on each diff hunk.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 12 AI-referenced docs walked. **No change:** `README.md`, `SPEC.md` (already three-valued from `.3`, untouched here), `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`. `docs/AGENT-NEUTRALITY.md` and `claude/CAPABILITIES.md` carry stale binary glyph examples — already flagged by `.3`'s sweep and deferred to `.5` (docs-example-currency); this task's scope (`claude/skills/**` + `SPEC/procedures/ft-task.md`) doesn't touch them, so no new drift introduced.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-13.`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (below).

**Final Summary:**

Rolled the `[medium]🧩` glyph (locked by `.3`'s contract) through every post-closure next-move + copy-paste cue emitter and ticket-filing label mention across the 13 pre-inventoried `claude/skills/**` files plus `SPEC/procedures/ft-task.md` — mechanical propagation, zero new decisions. Three edit patterns: (1) 6 ticket-filing "primary labels" mentions gained `[medium]🧩` as a third option; (2) `ft-audit-repo`'s already-three-valued line gained the 🧩 glyph on its bare `[medium]`; (3) 5 candidate-line + copy-paste emitters (`ft-close-epic`, `ft-epic-discovery`, `ft-micro-task`, `ft-worktree-start`, `ft-task/SKILL.md`) plus the `SPEC/procedures/ft-task.md` SOP mirror were rewritten from binary to three-valued, including `ft-task/SKILL.md`'s residual "binary… nearer glyph… no third glyph" language (flagged by `.3` as expected transient lag) replaced with the 1:1 tier-mirror rule. `ft-release/SKILL.md` was reviewed and confirmed as needing no change — its 🧠 is a fixed constant for its own self re-entry cue, not a candidate-derived glyph. Verified via grep sweep: zero residual binary-glyph language remains; every file with 🔧 now also carries 🧩. Edit surface: 13 files (12 skills + 1 SPEC procedure), prose-only, no code, no tests.

**Archived:** 2026-07-13
