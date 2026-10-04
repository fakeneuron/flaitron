---
title: gates-module
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-223, CORE-223.1, CORE-223.3, CORE-223.4, CORE-223.5]
---

# CORE-223.2 | gates-module

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-223]] [[CORE-223.1]] [[CORE-223.3]] [[CORE-223.4]] [[CORE-223.5]]

## 🎯 Goal

Extract the gate machinery (operator-gate cues, exit-gate flavors, conditional-skip rule) from SPEC.md into a new lazy module `SPEC/gates.md`, dedup the 4× `--fast` restatement into one canonical subsection, leave a thin anchor + pointer in core, and rewire gate §-refs across the 6 consuming skills.

## ✅ Acceptance

- [ ] New `SPEC/gates.md` holds: §"Operator-gate cues", the Phase 1 exit-gate flavors block, and the §"Conditional skip rule" block — verbatim content preserved (banners, tables, examples)
- [ ] The 4× `--fast` restatement is consolidated into one canonical `--fast` subsection in `SPEC/gates.md`; the three gate blocks reference it instead of restating
- [ ] SPEC.md keeps thin anchors + pointers (mirroring §"Epic lifecycle" / §"Blocked tasks" style): the "up to two banners" framing sentence stays in core so the 4-phase narrative is self-coherent
- [ ] Gate §-refs rewired across the 6 consuming skills (ft-task, ft-micro-task, ft-epic-discovery, ft-close-epic, ft-debug, ft-release): `per SPEC §"…"` → `per SPEC/gates.md §"…"` for the moved sections
- [ ] `paths:` frontmatter deferred to `.4`; gates.md opens with the `> Lazy-loaded SPEC module…` prose trigger line
- [ ] SPEC.md still reads coherently end-to-end; no dangling §-refs to moved content remain in core
- [ ] Wikilink-integrity + cross-ref grep clean (no broken `SPEC §"…"` pointing at relocated headings)

## 🧩 Subtasks

- [ ] Re-verify the exact line ranges of the three gate blocks against current SPEC.md HEAD (drift check)
- [ ] Grep the 6 consuming skills (+ docs) for gate §-refs to build the rewire map
- [ ] Create `SPEC/gates.md` with the lazy-module header + the three blocks + one canonical `--fast` subsection
- [ ] Excise the three blocks from SPEC.md, leaving thin anchor + pointer stubs (keep the "up to two banners" framing sentence)
- [ ] Rewire gate §-refs in the 6 skills to `SPEC/gates.md §"…"`
- [ ] Verify: SPEC.md coherent, grep clean, char count dropped as projected (~8k core saving)

## 🔗 Related

- [[CORE-EPIC-223]] — parent epic (spec-lazy-module-split)
- [[CORE-223.1]] — discovery; defined this child's scope, boundaries, and rewire breadth
- [[CORE-223.3]] — sibling: selection-module extraction (independent; runs in parallel)
- [[CORE-223.4]] — integration-wiring: adds `paths:` frontmatter, module-list refresh, budget verify, doc-currency
- [[CORE-223.5]] — final-subtask audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md is 39,862 chars — at the ~40k always-read budget cap. Extracting the gate machinery into `SPEC/gates.md` is the filed `.2` remedy; the `.1` Discovery locked the three design decisions (gate machinery → gates.md, `--fast` dedup to one subsection, thin anchor + pointer in core). Still the right work.

- [x] Read relevant source files — SPEC.md (full), `SPEC/epic.md`, `templates/tasknote-template.md`, the 6 consuming skills, GLOSSARY/PLATFORMS gate refs.

- [x] **Archive skim** — [[CORE-223.1]] (this epic's Discovery) measured the blocks and filed this child's exact scope. The lazy-module pattern is well-established (CORE-042.2 SPEC modularization; epic/starter/blocked/model/versioning already extracted). No conflicting prior decisions on the gate sections.

- [x] **Drift check** — re-verified the three block line ranges against current SPEC.md HEAD: Operator-gate cues `289–314`, exit-gate flavors `332–383`, Conditional skip rule `450–491`. SPEC.md = 39,862 chars (matches `.1`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  - **`--fast` dedup target:** one canonical `### `--fast` operator override` subsection in `SPEC/gates.md` consolidating the full `--fast` surface (📦 force-skip, 🛠️ drift carve-out, 👁️ suppression). The three in-gate restatements (SPEC 308, 375–382, 481) shrink to one-line cross-refs; the Phase-3 `--fast` note (SPEC 415–417, which stays in core) shrinks to a single pointer.
  - **Core anchor style:** keep the "up to two banners (🛠️ Phase 1→2, 📦 ready-to-commit), both conditional" framing sentence in SPEC.md §"The 4-phase workflow" so the phase narrative stays self-coherent, then pointer to `SPEC/gates.md` — mirrors §"Epic lifecycle" / §"Blocked tasks" / §"Model field" pointer style.
  - **`SPEC/gates.md` section names:** §"Operator-gate cues", §"Phase 1→2 exit gate", §"Conditional skip rule", §"`--fast` operator override". The exit-gate block keeps its content but gets a top-level heading (it was a `**bold**`-led block inside §Phase 1).
  - **Doc rewiring (GLOSSARY/PLATFORMS) deferred to [[CORE-223.4]]** per `.1`'s child split — `.4` explicitly owns the doc-currency sweep (GLOSSARY/PLATFORMS/AGENT-NEUTRALITY/MIGRATION + README). `.2` rewires SPEC.md self-coherence + the 6 skills only. See Handoff below.
  - **`paths:` frontmatter deferred to `.4`** (it owns frontmatter on both new modules); gates.md opens with the `> Lazy-loaded SPEC module…` prose trigger line only.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Rewire map (6 skills, `per SPEC §"…"` → `per SPEC/gates.md §"…"`):**

| File:line | Current ref | New ref |
|---|---|---|
| ft-task:36, 122 | `SPEC §"Operator-gate cues"` | `SPEC/gates.md §"Operator-gate cues"` |
| ft-task:120 | `SPEC §"📝 Phase 1: Discovery" exit gate` | `SPEC/gates.md §"Phase 1→2 exit gate"` |
| ft-task:142 | `SPEC §"Conditional skip rule"` | `SPEC/gates.md §"Conditional skip rule"` |
| ft-micro-task:40 | `SPEC §"Operator-gate cues"` | `SPEC/gates.md §"Operator-gate cues"` |
| ft-micro-task:112 | `SPEC §"Conditional skip rule"` | `SPEC/gates.md §"Conditional skip rule"` |
| ft-epic-discovery:144, 190 | `SPEC §"Operator-gate cues"` | `SPEC/gates.md §"Operator-gate cues"` |
| ft-epic-discovery:187 | `SPEC §"📝 Phase 1: Discovery" exit gate` | `SPEC/gates.md §"Phase 1→2 exit gate"` |
| ft-close-epic:119 | `SPEC §"📝 Phase 1: Discovery" exit gate` | `SPEC/gates.md §"Phase 1→2 exit gate"` |
| ft-close-epic:122 | `SPEC §"Operator-gate cues"` | `SPEC/gates.md §"Operator-gate cues"` |
| ft-close-epic:174 | `SPEC §"Conditional skip rule"` | `SPEC/gates.md §"Conditional skip rule"` |
| ft-release:226 | `SPEC §"Operator-gate cues"` | `SPEC/gates.md §"Operator-gate cues"` |
| ft-release:228 | `SPEC §"Conditional skip rule"` | `SPEC/gates.md §"Conditional skip rule"` |

Refs that **stay** in core (target heading not moved): `SPEC §"Post-closure protocol"` (heading stays; only its skip-rule subsection moves), `SPEC §"📝 Phase 1: Discovery"` when not pointing at the exit gate, `ft-epic-discovery:229/233`, `ft-close-epic:177` (Post-closure protocol step refs).

**SPEC.md internal self-refs to rebind** (within the move): lines 291/305/306/312/381 are *inside* moving blocks → become same-module sibling refs in gates.md. Lines in sections that **stay** but point at moved content: `418` (§Phase 3 → `SPEC/gates.md §"Operator-gate cues"`), `439` (§Phase 4 → `SPEC/gates.md §"Conditional skip rule"`), `493` (Post-closure step 1 → `SPEC/gates.md §"Operator-gate cues"`). Lines `400`/`431` point at `§"Post-closure protocol"` (stays) → no change.

**Handoff to [[CORE-223.4]]:** `docs/GLOSSARY.md` (lines 29, 67, 73, 83, 85) and `docs/PLATFORMS.md` (159, 182) carry hard `SPEC §"Operator-gate cues"` / `§"Conditional skip rule"` refs that point at now-relocated headings. Per `.1`'s child split these belong to `.4`'s doc-currency sweep, not `.2`. Flagging here so `.4` doesn't miss them. (GLOSSARY:77's `§"Post-closure protocol"` ref stays valid.)

**Exit judgment:** Discovery surfaced no significant deviation — line ranges matched `.1` exactly, rewire map is mechanical, all design decisions pre-locked at `.1`. → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established lazy-module shape (`SPEC/blocked.md`, `SPEC/model.md`): `# Title` + `> Lazy-loaded SPEC module. Loaded by … See \`SPEC.md\` …` prose trigger line + bare `§"…"` refs for both sibling and core sections. Core anchors mirror the §"Epic lifecycle" / §"Blocked tasks" "Canonical contract: see …" pointer style. No new shape invented.

- [x] Implemented the minimal solution — created `SPEC/gates.md`; excised the three blocks from SPEC.md leaving thin anchors; deduped the 4× `--fast` restatement to one canonical subsection; rewired 5 skills' gate §-refs (ft-debug had none).

- [x] Updated/added tests for non-trivial behavior — n/a (markdown-only; no executable surface).

**Implementation Notes:**

- **`SPEC/gates.md`** (10,097 chars) holds four sections: §"Operator-gate cues", §"Phase 1→2 exit gate" (was the `**Exit gate (two flavors)**` block, now a top-level heading), §"Conditional skip rule", and the consolidated §"`--fast` operator override". Banner format, trigger table, flavor tables, judgment rules, skip-signal globs, and emit blocks moved verbatim. Internal refs rebound to siblings (`§"Phase 1→2 exit gate"`, `§"Conditional skip rule"`) and to core (`§"Post-closure protocol"` step 1, `§"🚀 Phase 4: Closure"`).
- **`--fast` dedup:** the canonical subsection covers all three surfaces (📦 force-skip, 👁️ suppression, 🛠️ drift carve-out). The three in-gate mentions (Operator-gate cues, exit gate, skip rule) shrank to one-line pointers; SPEC.md §Phase 3's `--fast` note shrank to a single cross-ref.
- **SPEC.md core:** 39,862 → **32,528 chars** (−7,334). Kept coherence-framing sentences in each anchor (the "up to two banners" sentence, the exit-gate flavor names, the skip-rule one-liner) per `.1`'s thin-anchor-not-bare-pointer decision. No dangling internal refs (verified by grep).
- **Skill rewires (15 refs across 5 files):** ft-task ×4, ft-epic-discovery ×4, ft-close-epic ×3, ft-micro-task ×2, ft-release ×2. `SPEC §"Post-closure protocol"` refs left intact (heading stays in core).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (markdown docs only; no code touched). viz parser tests unaffected — no PLAN.md task-line grammar or tasknote-render surface changed.

- [x] Ran lint/type-check on changed code — n/a (no lint surface for SPEC/skill markdown; viz eslint scopes `viz/` only). Verified: no remaining bare `SPEC §"<moved-heading>"` refs anywhere; new `SPEC/gates.md §` links resolve (file exists at repo-root-relative path); SPEC.md reads coherently across all five edited regions.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a (no frontend).

**Testing Notes:** Grep-verified extraction integrity: zero dangling refs to the three moved headings across `claude/skills/` and SPEC.md; 15 rewired `SPEC/gates.md §` refs land in the 5 consuming skills. Char-budget check: SPEC.md 32,528 < 40k (comfortable margin; `.3` selection-module extraction will reduce further toward `.1`'s ~24,700 projection).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — AI-referenced docs (`_project/tasknote/README.md` §"AI-referenced docs"):
  - `README.md` — no change
  - `SPEC.md` — **updated** (this task: gate machinery extracted to `SPEC/gates.md`, thin anchors left)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (gate-machinery extraction is structural, not a new Claude-specific surface)
  - `docs/PLATFORMS.md` — **no change in `.2`** (carries hard `SPEC §"Operator-gate cues"` refs at lines 159/182 that now point at a relocated heading; rewiring deferred to [[CORE-223.4]]'s doc-currency sweep per `.1`'s child split). Flagged in Discovery Notes handoff.
  - (also out-of-set but flagged for `.4`: `docs/GLOSSARY.md` lines 29/67/73/83/85 — same deferred rewire.)

- [x] Closed — PLAN.md `CORE-223.2` line flipped to stub form (in place beneath the in-flight `CORE-EPIC-223` parent; parent stays open until `.3`/`.4`/`.5` close) and tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (inline on conditional skip).

**Final Summary:** Extracted the gate machinery from SPEC.md into a new lazy module `SPEC/gates.md` (10,097 chars): §"Operator-gate cues", §"Phase 1→2 exit gate", §"Conditional skip rule", plus a consolidated §"`--fast` operator override" that dedups the four `--fast` restatements into one canonical surface. SPEC.md keeps thin anchors + pointers (mirroring §"Epic lifecycle" style), dropping from 39,862 → 32,528 chars (−7,334, comfortable margin under the 40k always-read budget). Rewired 15 gate §-refs across 5 consuming skills (ft-task, ft-micro-task, ft-epic-discovery, ft-close-epic, ft-release). Doc-set gate refs (GLOSSARY/PLATFORMS) and `paths:` frontmatter deferred to [[CORE-223.4]] per the epic's child split.

**Archived:** 2026-05-30
