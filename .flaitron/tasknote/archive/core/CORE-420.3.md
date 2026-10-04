---
title: codex wrapper folds
status: completed
tags: []
created: 2026-08-09
related-tasks: [CORE-EPIC-420, CORE-390, CORE-391, CORE-420.5]
---

# CORE-420.3 | codex wrapper folds

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-420]] · [[CORE-390]] · [[CORE-391]] · [[CORE-420.5]]

## 🎯 Goal

Absorb the two v5.15.0 skill folds into the surviving Codex wrappers'
frontmatter descriptions, so Codex keeps the natural-language dispatch surface
the retired `ft-debug` / `ft-sidequest` wrappers used to carry.

## ✅ Acceptance

- [x] `codex/skills/ft-task/SKILL.md` description names the `--debug` fold (bugs / regressions / unknown root cause, hypothesis-first)
- [x] `codex/skills/ft-file-followup/SKILL.md` description names the `--park` fold (park an idea / quick fix mid-session)
- [x] Both descriptions stay in the Codex wrapper house style (one to two sentences, "from Codex" framing, no Claude-only vocabulary)
- [x] Sibling codex descriptions checked for the same fold-drift class; scope decision recorded in Discovery Notes (fix in place or explicitly out of scope — no silent leave-behind)
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Read the deleted `ft-debug` / `ft-sidequest` codex descriptions from git history for reusable dispatch language
- [x] Rewrite `codex/skills/ft-task/SKILL.md` description to fold in `--debug`
- [x] Rewrite `codex/skills/ft-file-followup/SKILL.md` description to fold in `--park`
- [x] Sweep the remaining 16 codex descriptions for the same class; record the scope verdict
- [x] Verify: re-read both frontmatter blocks; confirm YAML still parses and no body text changed

## 🔗 Related

- [[CORE-EPIC-420]] — parent epic: release-surface-sync (mirrored surfaces drift between releases)
- [[CORE-390]] — debug-mode-fold; deleted `codex/skills/ft-debug/` without absorbing its description
- [[CORE-391]] — sidequest-fold; deleted `codex/skills/ft-sidequest/` without absorbing its description
- [[CORE-420.5]] — will encode the claude-flags↔codex-descriptions mirror pair into `/ft-release` §7.1

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps verified present today — `codex/skills/ft-task/SKILL.md`
  and `codex/skills/ft-file-followup/SKILL.md` descriptions still predate the two
  v5.15.0 folds, while the Claude-side descriptions carry both. Mechanical
  frontmatter text change, no contract movement.

- [x] Read relevant source files — all 18 `codex/skills/*/SKILL.md` frontmatter
  blocks, `claude/skills/ft-task/SKILL.md` + `claude/skills/ft-file-followup/SKILL.md`
  frontmatter (mirror sources), `SPEC/procedures/ft-task.md` (the SOP the Codex
  ft-task wrapper routes to), `codex/AGENTS-snippet.md`, `docs/PLATFORMS.md`,
  `claude/skills/ft-release/SKILL.md` §7.1 standing checks. Read set narrow; no
  probe needed.

- [x] **Best Practices Review** — N/A for code boundaries; the changed surface is
  two YAML frontmatter strings. The applicable "pattern" is the Codex wrapper
  description house style (see Discovery Notes), which this task extends rather
  than reshapes.

- [x] **Archive skim** — `grep -l codex .flowtron/tasknote/archive/core/*.md` plus
  `git log --diff-filter=D -- 'codex/skills/*/SKILL.md'`. Load-bearing findings
  logged below (CORE-390, CORE-391, CORE-392, CORE-389.3).

- [x] **Drift check** — PLAN.md line verified against current files: both
  descriptions confirmed unchanged since before the folds. SPEC.md §"Skill
  namespace" already reflects the 18-skill post-fold roster; `SPEC/procedures/ft-task.md`
  already documents debug mode (lines 39/55/171/192/238/254-257/288), so the Codex
  *body* routing is intact and the gap is dispatch-surface only. No SPEC contract
  binds codex description wording — no drift to surface.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions: (1) the fix is the frontmatter
  `description:` line only — wrapper bodies stay untouched, since they already route
  correctly; (2) house style is one to two sentences retaining the "from Codex"
  framing, not a port of the far longer Claude description; (3) the flag tokens
  themselves (`--debug` / `--park`) belong in the text, following the existing
  `ft-audit` precedent of naming its arg shape.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The gap and its cause.** Two v5.15.0 folds each deleted a standalone Codex
wrapper without absorbing its dispatch language into the survivor:

- `CORE-390` (`c5ea07a`) deleted `codex/skills/ft-debug/SKILL.md`, whose description
  read *"Start and drive a hypothesis-first Flowtron debugging tasknote from Codex.
  Use for bugs with expected vs observed behavior."* The commit body notes that
  `/ft-task`'s **Claude** frontmatter was updated to name bugs and regressions
  "preserving NL dispatch after the fold" — the Codex mirror was not.
- `CORE-391` (`dec93c7`) deleted `codex/skills/ft-sidequest/SKILL.md`, whose
  description read *"Park a Flowtron sidequest from Codex with a tiny stub and PLAN
  row, then resume the interrupted work inline."* Same asymmetry.

Net effect on Codex: `$ft-task` and `$ft-file-followup` still *execute* both modes
correctly (the ft-task wrapper routes to `SPEC/procedures/ft-task.md`, which covers
debug mode; the ft-file-followup wrapper routes to the Claude SKILL.md, which
dispatches `park-mode.md`), but neither mode is discoverable from the description a
Codex skill picker reads. The capability is wired; only the signpost is missing.

**Why the release gates missed it.** `/ft-release` §7.1's standing parity checks
compare *slug inventories* and symlink counts (`find codex/skills … | sort` vs the
Claude side, plus the installed-surface diffs) — never description content. A fold
that removes a slug from both platforms passes every check while silently dropping
one platform's dispatch text. This is precisely the mirror pair
[[CORE-420.5]] is filed to encode ("claude skill flags↔codex descriptions").

**Sibling sweep (Acceptance criterion 4).** All four wrapper deletions in
`codex/skills/` history, classified:

| Retirement | Fold target | Codex description absorbed? |
|---|---|---|
| `ft-debug` (CORE-390) | `ft-task --debug` | **No** — fixed here |
| `ft-sidequest` (CORE-391) | `ft-file-followup --park` | **No** — fixed here |
| `ft-quality` (CORE-392) | none (pure retirement) | N/A — nothing to absorb |
| `ft-audit-{backend,docs,frontend,performance,security}` (CORE-389.3) | `ft-audit <domain>` | **Yes** — description already reads `` `ft-audit <domain> [scope]` (general/backend/frontend/security/performance/docs) `` |

The `ft-audit` row is both the proof the class is bounded at two instances and the
in-repo style precedent for naming a folded arg surface in a Codex description.

**Scope boundary — flags that are not folds.** The remaining Codex descriptions omit
flags too (`ft-task --fast`, `ft-goal-task --fast`/`--worktree`, `ft-epic-discovery
--deep`). These are deliberately **out of scope**: they are modifiers that never had
a standalone skill, so no dispatch surface was lost when they shipped, and the PLAN
line scopes this task to "the v5.15.0 skill folds". Recorded rather than silently
left — if the operator wants them named too, that is a separate filing.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — surveyed all 18 sibling Codex wrapper descriptions.
  The established shape is one to two sentences, "… from Codex" framing, capability
  first; `ft-audit` is the one wrapper that already names a folded arg surface
  inline (`` `ft-audit <domain> [scope]` `` + the domain list). Extended that shape
  rather than porting the much longer Claude descriptions.

- [x] **Minimal refactor gate** — no refactor. The change is two frontmatter
  strings; wrapper bodies already route correctly and were deliberately not touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no executable behavior;
  flowtron ships no schema validator by design, per `SPEC.md` §"What flowtron does
  NOT provide"). Verification is the structural frontmatter check in Testing Notes.

**Implementation Notes:**

Two edits, one line each — `description:` only, bodies byte-identical:

- `codex/skills/ft-task/SKILL.md:3` — appended: *"With `--debug`, drive it
  hypothesis-first for a bug, regression, or unexpected behavior whose root cause is
  not yet known."*
- `codex/skills/ft-file-followup/SKILL.md:3` — appended: *"With `--park`, park an
  idea or quick fix as a tiny stub plus PLAN row, then resume the interrupted work
  inline."*

Both keep the original first sentence verbatim, so the pre-fold dispatch surface is
additive-only. Wording draws on the deleted wrappers' own descriptions (CORE-390 /
CORE-391) rather than inventing new vocabulary, and on the Claude-side descriptions
for the trigger phrasing ("root cause is not yet known", "park an idea or quick fix").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown frontmatter; no
  suite covers it). Substituted the structural + parity checks below.

- [x] Ran lint/type-check on changed code — substituted a frontmatter structural
  check (no YAML linter in-repo; `pyyaml` unavailable on this machine).

- [x] **Quality assertions** — no duplication (each string appears once; nothing
  else in the repo cites them, verified by grep), no dead code, no public-surface
  growth (two existing fields edited, none added), and the touched docs are now
  *less* stale, not more.

- [ ] (frontend) Asked the user for visual confirmation — N/A, no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Four checks, all green:

1. **Diff scope** — `git diff --stat` → `2 files changed, 2 insertions(+), 2
   deletions(-)`; `git diff -U0 | grep -c '^[+-][^+-]'` → `4` (two `-`/`+` pairs),
   confirming only the two `description:` lines moved and no body text changed.
2. **Frontmatter structure** — both files still close their frontmatter at line 3
   with `name` + `description` only; each new value is plain-scalar safe (no
   reserved leading indicator, no bare `": "` inside the value), so the backticked
   flag tokens parse as literal text.
3. **No external citations** — `grep -rn --include='*.md'` for both original
   description strings returns only the two source files; nothing mirrors them.
4. **Release parity intact** — `/ft-release` §7.1's shipped-skill parity check
   (`find claude/skills … | sort` vs `find codex/skills … | sort`) still diffs
   clean; this task changes description text, not the slug inventory.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — roster one-liners are Claude-side; no Codex description quoted |
  | `SPEC.md` | no change — §"Skill namespace" already lists the 18-skill post-fold roster; description wording is not contract-bound |
  | `docs/MIGRATION.md` | no change — adoption/bump steps reference slugs and symlinks, not descriptions |
  | `claude/AGENTS-snippet.md` | no change — Claude wiring only |
  | `codex/AGENTS-snippet.md` | no change — `ln -s` wiring + invocation notes; carries no per-skill description |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change |
  | `docs/AGENT-NEUTRALITY.md` | no change — this task *reduces* a Claude-specific asymmetry rather than adding one |
  | `docs/PLATFORMS.md` | no change — §"Installed-surface policy" and the two-layer model are slug-scoped; `codex/skills/` parity claim ("kept in parity with Claude's shipped skill slugs") remains true |
  | `claude/CAPABILITIES.md` | no change |
  | `docs/AGENT-COMPAT.md` | no change — the Codex row's `v5.15.0 · 2026-08-02 (dogfooded)` stamp records wiring currency, not description text; no re-stamp warranted |
  | `docs/EXTERNAL-AGENTS.md` | no change |
  | `docs/WORKTREES.md` | no change |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Codex operators can now discover debug mode and park mode from the skill picker.
The two v5.15.0 folds each deleted a standalone Codex wrapper (`ft-debug`,
`ft-sidequest`) and updated the *Claude* survivor's description while leaving the
Codex mirror at its pre-fold text — so the capability stayed wired but stopped being
findable by natural-language dispatch.

- **Changed:** `codex/skills/ft-task/SKILL.md:3` and
  `codex/skills/ft-file-followup/SKILL.md:3` — one `description:` line each
  (2 files, +2/−2). Bodies untouched.
- **Verified:** diff scope (`git diff -U0` → exactly 4 changed lines); frontmatter
  structure + plain-scalar safety on both files; no external citation of either
  original string; `/ft-release` §7.1 shipped-skill slug parity still diffs clean.
- **Refactors:** none made, none deferred — the minimal fix is the whole fix.
- **Documentation:** doc-drift sweep run across all 14 AI-referenced docs; all "no
  change" (the sweep table records why each was checked, notably
  `docs/PLATFORMS.md`'s slug-scoped parity claim and `docs/AGENT-COMPAT.md`'s
  wiring-currency stamp, neither of which this touches).
- **Maintainability:** removes the last unabsorbed instance of the fold-drift class
  (sibling sweep found only two, both fixed here; `ft-audit` had already absorbed
  its own fold correctly). The *class* stays open until [[CORE-420.5]] encodes the
  claude-flags↔codex-descriptions mirror pair into `/ft-release`'s drift sweep —
  this task fixes the instance, not the gate.

**Archived:** 2026-08-09
