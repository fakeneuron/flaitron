---
title: release v4.5.0
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-254, CORE-256, CORE-259, CORE-250, CORE-245]
---

# CORE-260 | release v4.5.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]] [[CORE-256]] [[CORE-259]] [[CORE-250]] [[CORE-245]]

## 🎯 Goal

Cut flowtron v4.5.0 — minor release tagging CORE-EPIC-254 (cross-agent operator-cue vocabulary + contract + wiring + Grok/Codex verification), CORE-256/259 (model-label valid-set + `[medium]` cognition tier), and CORE-250 (injection threat-model harden), plus supporting fixes/doc-currency since v4.4.0.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v4.4.0` → `**Version:** v4.5.0`
- [ ] `docs/MIGRATION.md:323` — example pin bumped `v4.4.0` → `v4.5.0`
- [ ] `SECURITY.md:109` — release-tag example pin bumped `v4.4.0` → `v4.5.0`
- [ ] `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION` bumped `v4.4.0` → `v4.5.0`
- [ ] Phase 4 doc-drift sweep run across the AI-referenced docs set (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-260 — flowtron v4.5.0 (...)` commit lands
- [ ] Annotated `v4.5.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-260.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v4.4.0` → `**Version:** v4.5.0`
- [ ] `docs/MIGRATION.md:323` — bump example pin `(e.g., \`v4.4.0\`)` → `(e.g., \`v4.5.0\`)`
- [ ] `SECURITY.md:109` — bump release-tag example pin `(e.g. \`v4.4.0\`)` → `(e.g. \`v4.5.0\`)`
- [ ] `viz/src/ui/constants.ts:39` — bump `FLOWTRON_VERSION = 'v4.4.0'` → `'v4.5.0'`
- [ ] Phase 3 — markdown lint mental-pass on edited lines + viz lint/typecheck
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v4.5.0`; push tag to origin

## 🔗 Related

- [[CORE-EPIC-254]] — cross-agent-operator-cues (operator-cue vocabulary + contract codify + skill wiring + Grok/Codex dogfood verification; the epic triggering this minor bump)
- [[CORE-256]] — model-label-valid-set (category-vs-concrete tier matching)
- [[CORE-259]] — model-tier-third-rung (`[medium]` cognition tier)
- [[CORE-250]] — injection-threat-model-harden (invisible-unicode, git-exfil, forged control-markers)
- [[CORE-245]] — release v4.4.0 (most recent precedent; 4-pin bump shape)

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 20 commits since v4.4.0. Highest-rank classification = `feat:` (CORE-250, CORE-251/252, CORE-EPIC-254 children, CORE-255/256/259 — no `!` or BREAKING) → minor bump. Auto-computed bump matches the PLAN-line target (v4.4.0 → v4.5.0); user confirmed at `/ft-release` Step 2. Recipe is canonical and living (CORE-245 v4.4.0 is the immediate precedent). Four live version pins in the AI-referenced doc set; the `last-verified` stamps are already at v4.4.0 (refreshed during CORE-254 cross-agent dogfooding) and stay there on a minor bump (verify-not-bump per the CORE-224 convention).

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:323`, `SECURITY.md:109`, `viz/src/ui/constants.ts:39`
- [x] **Archive skim** — CORE-245 (v4.4.0, immediate precedent; clean 4-pin shape); see Discovery Notes
- [x] **Drift check** — the four pin locations are live and exact at HEAD (SPEC.md:3, docs/MIGRATION.md:323, SECURITY.md:109, viz/src/ui/constants.ts:39). Additional live `v4.4.0` refs are `last-verified` stamps (AGENT-COMPAT.md:36/37/38, CAPABILITIES.md:56) — verify-not-bump on a minor cut.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v4.4.0` ✓ → bump
- `docs/MIGRATION.md:323` — `(e.g., \`v4.4.0\`)` (final pin verification paragraph) ✓ → bump
- `SECURITY.md:109` — `(e.g. \`v4.4.0\`)` in "Pin to annotated release tags" ✓ → bump
- `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.4.0'` ✓ → bump
- `git describe --tags --abbrev=0` → `v4.4.0` — matches `SPEC.md:3`, no drift ✓

### Commits since v4.4.0 (20 total) — grouped by adopter-facing area

**Cross-agent operator cues (CORE-EPIC-254) — the headline feat: cohort:**
- feat: CORE-254.1 — file epic + scope children
- feat: CORE-254.2 — define canonical operator-cue vocabulary
- feat: CORE-254.3 — codify cue vocabulary + bounded destructive-action escalation
- docs: CORE-254.4 — cue-skill-wiring (mechanical alignment to gates.md vocabulary)
- docs: CORE-254.5 — cue-cross-agent (fallback policy + verification currency)
- feat: CORE-254.6 — audit and close CORE-EPIC-254
- feat: CORE-257/258 — cross-agent cue verification (Grok + Codex dogfood) + AGENTS.md entry-point
- feat: CORE-255 — next-task-cue-emoji-hardcoded fix

**Model-label vocabulary:**
- feat: CORE-256 — model-label-valid-set (category-vs-concrete tier matching)
- feat: CORE-259 — model-tier-third-rung (`[medium]` cognition tier)

**Security:**
- feat: CORE-250 — harden injection threat model (invisible-unicode, git-exfil, forged control-markers)
- feat: CORE-251 — record runtime-security-tooling rejection in VISION/SPEC
- feat: CORE-252 — record wiki-layer-subsystem rejection in VISION/SPEC

**Fixes / hygiene (standalone):**
- fix: FE-045 — deflake vitest full-run (navigateToTask real timers)
- fix: CORE-253 — reconcile MIGRATION §1.2.2 audit-scaffold claim
- fix: CORE-246/247/248/249 — reconcile ft-release skill with release reality
- chore/docs: tasknote filing (CORE-251/252, CORE-255..258), FE-046/047 filing

### Archive skim findings

- **CORE-245** (v4.4.0, 2026-05-31) — immediate precedent. 4 doc pins (SPEC + MIGRATION + SECURITY + viz constants). Clean "no required project-side edits" migration block. Note: that cut had two `last-verified` stamps still at v4.3.0 (minor-bump verify-not-bump). This cut's stamps are already at v4.4.0 (refreshed during CORE-254 cross-agent dogfooding 2026-06-01) — same verify-not-bump treatment.
- **Structural note:** this cut matches CORE-245's 4-pin shape exactly. The `last-verified` stamps (AGENT-COMPAT.md:36/37/38, CAPABILITIES.md:56) are verify-not-bump.

### `last-verified` stamps — verify, do not bump

Live `v4.4.0` refs that are currency stamps, not version pins:
- `docs/AGENT-COMPAT.md:36` — Claude Code row: `v4.4.0 · 2026-06-01 (dogfooded)`
- `docs/AGENT-COMPAT.md:37` — Grok Build row: `v4.4.0 · 2026-06-01 (dogfooded)`
- `docs/AGENT-COMPAT.md:38` — Codex CLI row: `v4.4.0 · 2026-06-01 (dogfooded)`
- `claude/CAPABILITIES.md:56` — `v4.4.0 · 2026-06-01 (dogfooded)`

Per the convention (AGENT-COMPAT.md §"Reading the cells"), the update obligation fires only on a first flowtron session under the agent or after a **major** version bump. v4.4.0 → v4.5.0 is **minor**, and all three agents are already verified at v4.4.0, so neither trigger fires. The stamps stay — they remain factually accurate. The §7.1 doc-drift sweep verifies (still accurate ✓) without bumping. To be re-surfaced at the §7.1 sweep for operator confirmation.

### Adopter migration impact (v4.4.0 → v4.5.0) — no required adopter action

All 20 commits are additive contract/reference additions, security-doc hardening, or internal fixes/hygiene:
- **CORE-EPIC-254** codifies the operator-cue vocabulary (🟢 GO · ▶️ RUN · 📦 · 🏁) in SPEC/gates.md and aligns the shipped skills — adopters consuming the `ft-*` bundle receive the updated skills + contract automatically on pin bump; no project-side edits.
- **CORE-256/259** add `[medium]` as a valid cognition tier and tighten model-label matching — additive to the `[model]` grammar; existing `[heavy]`/`[light]` labels unaffected.
- **CORE-250/251/252** harden the SECURITY.md injection threat model and record two scope rejections in VISION/SPEC — documentation, no wiring.

No SPEC contract breakage, no new required tasknote sections.

**Migration block (for the annotated tag):** "No required project-side edits. The cross-agent operator-cue vocabulary (CORE-EPIC-254) and the additive `[medium]` model tier (CORE-256/259) ship in the submodule; adopters bumping the pin receive them automatically — updated `ft-*` skills and SPEC contract, no manual file edits. Existing `[heavy]`/`[light]` labels and skill invocations are unaffected."

### Assumptions (explicit, no clarifying questions needed)

1. The four version pins above are the only live references that *move*. The four `last-verified` stamps stay at v4.4.0 (minor-bump scoping). Historical refs in archive/ and PLAN.md history stay (write-once).
2. The tag message groups by area: cross-agent operator cues, model-label vocabulary, security/threat-model, fixes & hygiene.
3. Push-go offered at the 📦 gate (default Yes).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-245 (v4.4.0) precedent; four single-token version-string substitutions, no prose or structural change
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (3 doc-prose edits + 1 string-constant edit)

**Implementation Notes:**

Four pin edits in order:

1. `SPEC.md:3` — `**Version:** v4.4.0` → `**Version:** v4.5.0`.
2. `docs/MIGRATION.md:323` — example pin `(e.g., \`v4.4.0\`)` → `(e.g., \`v4.5.0\`)`.
3. `SECURITY.md:109` — release-tag example pin `(e.g. \`v4.4.0\`)` → `(e.g. \`v4.5.0\`)`.
4. `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.4.0'` → `'v4.5.0'`.

Verified post-edit: broad grep for `v4.4.0` across the live doc + code set returns only the six `last-verified` stamps (AGENT-COMPAT.md:36/37/38, PLATFORMS.md:236/247, CAPABILITIES.md:56), intentionally retained per the minor-bump verify-not-bump scoping. Release diff: 4 pin files + PLAN line + tasknote archive.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz lint + typecheck (the constants.ts edit); markdown edits need no suite
- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` (0) + `npm --prefix viz run typecheck` (`tsc --noEmit`, 0) both pass
- [x] (frontend) Asked the user for visual confirmation — N/A (version string only; viz footer label updates v4.4.0 → v4.5.0)

**Testing Notes:**

Markdown lint mental-pass passed — all three prose edits are single-token version substitutions inside existing sentences; no frontmatter, fenced blocks, or links altered. The `constants.ts` edit is a one-line string-constant substitution; viz `lint` + `typecheck` both clean. A version-string change does not affect the viz test suite.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `Skill(ft-audit-docs)` subroutine over the 11-file AI-referenced docs set returned **health 10/10**. Recent feature work (CORE-254 cue vocabulary, CORE-256/259 `[medium]` tier) already reflected across SPEC.md, AGENT-NEUTRALITY.md, CAPABILITIES.md, PLATFORMS.md, AGENTS-snippet.md — each feature ran its own Phase 4 sweep. One Low cosmetic finding (`last-verified` backtick-style inconsistency across 6 stamps) → filed as **CORE-261** (`/ft-file-followup`, operator chose file-not-absorb). The six `v4.4.0` `last-verified` stamps verified accurate and deliberately not bumped (minor-bump verify-not-bump).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v4.5.0 — minor release tagging CORE-EPIC-254 (cross-agent operator-cue vocabulary codified in SPEC/gates.md, shipped-skill alignment, Grok/Codex dogfood verification), CORE-256/259 (model-label valid-set + additive `[medium]` cognition tier), and CORE-250/251/252 (injection threat-model harden + two scope rejections), plus FE-045 and the CORE-246–249/253 ft-release/MIGRATION reconciliation fixes since v4.4.0. Four version-pin edits (SPEC.md:3, docs/MIGRATION.md:323, SECURITY.md:109, viz/src/ui/constants.ts:39); the six `last-verified` stamps deliberately held at v4.4.0 per the convention's minor-bump scoping. viz lint + typecheck green; doc-drift sweep returned health 10/10 with one Low cosmetic finding filed as CORE-261. Single commit + annotated `v4.5.0` tag. No required project-side edits for adopters — the cross-agent cue vocabulary and `[medium]` tier are additive, picked up automatically on pin bump.

**Archived:** 2026-06-01
