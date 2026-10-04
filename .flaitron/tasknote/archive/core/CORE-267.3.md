---
title: ft-release-gate-wiring
status: completed
tags: []
created: 2026-06-01
related-tasks: [CORE-EPIC-267, CORE-267.2, CORE-267.4, CORE-265]
---

# CORE-267.3 | ft-release-gate-wiring

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-267]] [[CORE-267.2]]

## 🎯 Goal

Wire the dogfood-or-explicit-skip gate (defined by [[CORE-267.2]]) into `claude/skills/ft-release/SKILL.md` §5/§7: walk the dogfooded-agent rows (Claude/Grok/Codex) at release time, force per-agent resolution, and block tagging until every row is resolved.

## ✅ Acceptance

- [ ] §5 (Phase 2) "`last-verified` stamps — verify, don't bump" paragraph rewritten into the dogfood-gate **walk**: enumerate dogfooded rows (carry a `dogfooded` tag), force per-agent resolution (refresh prefix+date / record `; skipped @ vA.B.C`), apply each agent's resolution across all its stamp locations; the old minor/patch-exempt rule removed
- [ ] §7.4 (📦 gate) carries a **dogfood-gate** resolution summary in the closure-review bundle + preview line, and blocks commit-go (= blocks tagging) until every dogfooded row is resolved
- [ ] §7.4 staging step includes the dogfood-gate stamp files (`docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`) when refreshes/skips landed
- [ ] §3 release-recipe Acceptance gains a dogfood-gate line so the gate is part of the canonical recipe
- [ ] Skipped-stamp residue (prefix pinned to last real verification) documented as expected, not drift, in the §5 grep-verification note
- [ ] No live stamp value changes (that's [[CORE-267.4]]); no SPEC contract edit (ft-release is flowtron-self only); no `docs/AGENT-COMPAT.md` convention edit (that landed in [[CORE-267.2]])
- [ ] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" at closure

## 🧩 Subtasks

- [ ] Re-read `ft-release/SKILL.md` §3 / §5 / §7.4 against HEAD; confirm line anchors
- [ ] Decide resolution-prompt placement (§5 attest+edit vs. bundled-into-📦 prompt) — clarifying question
- [ ] Rewrite §5's stamp paragraph into the dogfood-gate walk
- [ ] Add the dogfood-gate line to §3 Acceptance recipe
- [ ] Wire the dogfood-gate summary + enforcement + staging into §7.4
- [ ] Markdown mental-pass; Phase 4 doc-drift sweep + flip PLAN line + archive

## 🔗 Related

- [[CORE-EPIC-267]] — parent epic (release-dogfood-gate)
- [[CORE-267.2]] — defined the convention this task wires into `ft-release`
- [[CORE-267.4]] — next: applies the convention to the live v5.0.0 Grok/Codex skip-debt
- [[CORE-265]] — release v5.0.0; the ad-hoc skip this gate productizes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Second implementation child of `CORE-EPIC-267`, scoped by the `.1` Discovery; consumes the `.2` convention (archived). The convention text already names `ft-release §5/§7` as its enforcement point — this task makes that real. Clear single-file edit (the skill); dependency `.2` is satisfied.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` (§3/§5/§7); `docs/AGENT-COMPAT.md` §"Reading the cells" (the convention); CORE-267.1 + .2 archives

- [x] **Archive skim** — see Discovery Notes

- [x] **Drift check** — see Discovery Notes

- [x] Asked clarifying questions — 1 fork resolved (resolution-prompt placement)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Resolved scoping (AskUserQuestion, 2026-06-01)

| Question | Resolution |
|---|---|
| Where does the per-agent dogfood resolution live? | **Resolve in §5, enforce in §7.4.** Operator attests per-agent during Phase 2 (§5); stamp edits land there like all doc edits. The 📦 gate (§7.4) carries a dogfood-gate resolution summary, stages the touched stamp files, and blocks commit-go until every dogfooded row is resolved. (Confirmed the recommended default — keeps doc edits in Phase 2, no restructuring of the §7.5 atomic sequence.) |

**Phase 1→2 exit-gate judgment:** Discovery surfaced a design-placement fork; operator confirmed the recommended approach → no deviation from the planned plan → skip 🛠️.

### Archive skim (core/)

- **`CORE-267.1.md`** (epic Discovery) — resolved scoping: gate dogfooded agents only (Claude/Grok/Codex); reuse existing stamps as the checklist; record skips via `skipped @ vX.Y.Z`. ft-release is flowtron-self only → the gate is a skill concern, **no SPEC contract edit**.
- **`CORE-267.2.md`** (convention) — rewrote `AGENT-COMPAT.md` §"Reading the cells" obligation into a **release gate (dogfood-or-explicit-skip)** and named the enforcement point: "`ft-release` §5/§7, which walks the dogfooded rows and forces per-row resolution before tagging." This task is the named consumer.
- **`CORE-265.md`** / **`CORE-248.md`** — CORE-248 seeded ft-release §5's "verify, don't bump" awareness (the seam being rewritten); CORE-265 is the ad-hoc skip this gate productizes.

### Stamp-location inventory (the walk's targets)

Dogfooded rows = 3 agents, stamps spread across 3 files:

| Agent | Stamp locations |
|---|---|
| Claude | `docs/AGENT-COMPAT.md` matrix row + `claude/CAPABILITIES.md` §"Last verified" |
| Grok | `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` per-agent footer |
| Codex | `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` per-agent footer |

A per-agent resolution must touch **all** that agent's locations together (otherwise the matrix and the footer drift).

### Drift check (HEAD)

- `ft-release/SKILL.md` §5 stamp paragraph live at l.142 ("`last-verified` stamps — verify, don't bump"). This is the seam — and it **contradicts** the new convention (old rule exempts minor/patch; new rule resolves every release). Rewrite, not append.
- §7.4 staging command (l.221–224) lists `SPEC.md docs/MIGRATION.md SECURITY.md viz/src/ui/constants.ts .flowtron/PLAN.md` + archived tasknote — does NOT include the stamp files. Needs conditional addition when the walk lands edits.
- `docs/AGENT-COMPAT.md` §"Reading the cells" convention live at l.62–87 (the `; skipped @ vX.Y.Z` suffix + the release-gate obligation). ✅

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended two existing shapes rather than inventing: the §5 per-step "stamp" paragraph (rewritten in place) and the §7.4 bundled in-📦 prompt (the dogfood-gate summary parallels the existing push-go prompt, per SPEC/gates.md bundled-prompt override)

- [x] Implemented the minimal solution — 4 edits to `claude/skills/ft-release/SKILL.md`

- [x] Updated/added tests for non-trivial behavior — N/A (prose SKILL.md; no executable surface)

**Implementation Notes:**

4 edits, all in `claude/skills/ft-release/SKILL.md`:

1. **§3 Acceptance recipe** — added a dogfood-gate acceptance line after the `viz` pin, so the gate is part of the canonical release recipe.
2. **§5 (Phase 2) rewrite** — replaced the old "`last-verified` stamps — verify, don't bump" paragraph (which exempted minor/patch cuts) with the **dogfood-gate walk**: (1) enumerate dogfooded rows via grep; (2) per-agent AskUserQuestion → Refreshed (bump prefix+date, drop skip suffix) or Skipped (pin prefix, set/bump `; skipped @ vA.B.C`); (3) apply each agent's resolution across all its stamp locations together (matrix + footer/CAPABILITIES). Added a "grep residue is expected for skipped rows" note so a pinned old prefix reads as a recorded skip, not drift.
3. **§7.4 staging** — added a conditional `git add docs/AGENT-COMPAT.md docs/PLATFORMS.md claude/CAPABILITIES.md` for any walk-landed stamp edits (no-op on unchanged files).
4. **§7.4 bundle** — added a **Dogfood-gate resolution (enforcement)** bundle item with the per-agent summary block + a hard-gate rule (no commit-go while any dogfooded row is unresolved → back to §5); mentioned the stamp refreshes/skips in the 📦 preview line.

Per the Discovery resolution: resolution prompt + stamp edits live in §5 (Phase 2 doc edits); §7.4 surfaces the summary, stages the files, and blocks tagging. No live stamp value changes (that's `.4`), no `AGENT-COMPAT.md` convention edit (that's `.2`), no SPEC contract edit (ft-release is flowtron-self only).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (prose SKILL.md; no executable surface)

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass instead (below)

- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend)

**Testing Notes:**

Markdown mental-pass on the 4 edited regions: ordered list (1–3) in §5 well-formed · backtick/bold/italic spans balanced · `text` fenced block in §7.4 closes cleanly · em-dash + arrow glyphs consistent with surrounding prose · §3 acceptance line matches sibling checkbox shape. Grep verification: **no** stale "verify, don't bump" / "minor/patch leave" / "major bump" phrasing remains in the skill (the old rule is fully replaced); **no** external doc (`docs/`, `README.md`, `SPEC.md`, `SPEC/`, `.flowtron/tasknote/README.md`) describes ft-release's stamp rule, so nothing else needs syncing. The convention text in `docs/AGENT-COMPAT.md` §"Reading the cells" (from `.2`) now has its named enforcer wired. Clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — **no change** across all 11 AI-referenced docs (README.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md). The edit is confined to `claude/skills/ft-release/SKILL.md`, which is loaded on demand and **not** part of the cold-start sweep set (per README.md §"AI-referenced docs"). The convention these docs encode (AGENT-COMPAT §"Reading the cells", from `.2`) is unchanged — `.3` only wires its named enforcer. Live PLATFORMS/CAPABILITIES stamp values stay as-is (that's `.4`).

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (kept nested under `CORE-EPIC-267` per epic-cohort grouping) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip — doc/skill-only, no signal trips)

**Final Summary:**

Wired the dogfood-or-explicit-skip gate (convention defined by `.2`) into `claude/skills/ft-release/SKILL.md`. Four edits: (1) §3 release-recipe Acceptance gains a dogfood-gate line; (2) §5's old "verify, don't bump" stamp paragraph — which exempted minor/patch cuts and let Grok/Codex drift a full major behind — is rewritten into a **per-release walk** that enumerates the dogfooded rows (Claude/Grok/Codex), forces a per-agent AskUserQuestion resolution (refresh prefix+date, or pin prefix + `; skipped @ vA.B.C`), and applies each agent's resolution across all its stamp locations together; (3) §7.4 staging conditionally adds the touched stamp files; (4) §7.4's 📦 bundle gains a dogfood-gate resolution summary + a hard gate that blocks commit-go (= blocks tagging) until every dogfooded row is resolved. Per the Discovery clarification, the resolution prompt + stamp edits live in §5 (Phase 2) and the 📦 gate (§7.4) enforces. No live stamp changes (`.4`), no convention edit (`.2`), no SPEC contract edit (flowtron-self skill). Next: `.4` discharges the live v5.0.0 Grok/Codex skip-debt using this gate.

**Archived:** 2026-06-01
