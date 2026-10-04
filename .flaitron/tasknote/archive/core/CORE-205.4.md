---
title: adopter-neutrality-docs
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-205, CORE-205.3]

---

# CORE-205.4 | adopter-neutrality-docs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-205]]

## 🎯 Goal

Survey MIGRATION.md, claude/AGENTS-snippet.md, ft-new-project skill, and ft-flowtron roster for Claude-only framing that could confuse Codex/Grok/Cursor users; add neutral notes or carve-outs where needed.

## ✅ Acceptance

- [ ] Survey of MIGRATION.md, claude/AGENTS-snippet.md, claude/skills/ft-new-project/SKILL.md, and claude/skills/ft-flowtron/SKILL.md completed for adopter-addressing prose that assumes "Claude Code" as the sole/primary runtime or UI.
- [ ] Any Claude-only framing that could confuse Codex/Grok/Cursor users following the docs verbatim identified and either (a) given neutral carve-out/parenthetical, (b) left as intentional per AGENT-NEUTRALITY ledger with note, or (c) documented as out-of-scope (e.g. global skill bootstrapper env).
- [ ] Phase 4 doc-drift sweep records the precise one-line update (or "no change") for every AI-referenced doc touched; this tasknote + Discovery Notes serve as the 2026-05-25 adopter-docs neutrality verification record for CORE-EPIC-205.

## 🧩 Subtasks

- [ ] Read CORE-205.1.md (epic discovery that filed this child), docs/AGENT-NEUTRALITY.md (ledger), the 4 target files (MIGRATION.md, AGENTS-snippet.md, ft-new-project/SKILL.md, ft-flowtron/SKILL.md), recent siblings .2/.3, and PLATFORMS.md for pattern.
- [ ] Run targeted greps + manual review for "Claude Code" / "fresh Claude" / "in Claude" in adopter-facing prose within the 4 targets; cross-ref against AGENT-NEUTRALITY intentional table.
- [ ] Identify specific framing sites that could mislead non-Claude adopters (e.g. verify steps saying "in a fresh Claude Code session"); decide minimal neutral carve-outs consistent with existing multi-agent lists in MIGRATION/AGENTS-snippet.
- [ ] Apply minimal edits (parentheticals or "or equivalent in your agent") only where justified; leave intentional surfaces untouched.
- [ ] Populate Related + frontmatter; tick all Phase 1 boxes; apply default-skip 🛠️ judgment (no significant deviation from .1 scope).
- [ ] Phase 2/3/4: pattern survey of sibling hygiene style, targeted doc edits, "tests" = greps/ls/reads + mental lint, doc-drift sweep, closure.

## 🔗 Related

- [[CORE-EPIC-205]] — parent epic: agent-neutrality-sweep (adopter-docs hygiene child)
- [[CORE-205.1]] — discovery that filed the .2–.5 children (2026-05-25)
- [[CORE-205.2]] — contract-layer-hygiene sibling (zero changes, same day)
- [[CORE-205.3]] — wiring-layer-symmetry sibling (zero changes, same day)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope is precise and verbatim from CORE-205.1 filing (the adopter-facing docs + skills child for Claude-only framing that could confuse Codex/Grok/Cursor users). Precedent from .2 (contract hygiene, zero changes) and .3 (wiring symmetry, zero changes) confirms this epic's children are verification/hygiene passes on 2026-05-25 post-release surfaces. No re-scope or de-scope; the work is a point-in-time review of the exact 4 surfaces + ledger. Fits the [grok] retag for mechanical doc audit with clear diff (carve-outs in verify steps). Builds directly on [[CORE-205.1]], [[CORE-205.2]], [[CORE-205.3]], [[CORE-EPIC-154]], [[CORE-EPIC-198]].

- [x] Read relevant source files — CORE-205.1.md (full; epic context + filed child scopes + "Resolved scoping" table + sweep findings), docs/AGENT-NEUTRALITY.md (full ledger + intentional surfaces table + "structured ask" terminology), docs/MIGRATION.md (full §1 fresh adoption + verify steps), claude/AGENTS-snippet.md (full; neutral paste block + wiring verifier + "One-time symlink wiring"), claude/skills/ft-new-project/SKILL.md (full; bootstrapper + "fresh Claude Code session" verify + CLAUDE.md precondition), claude/skills/ft-flowtron/SKILL.md (full roster + key docs descs), CORE-205.2.md + CORE-205.3.md (sibling hygiene records), docs/PLATFORMS.md (two-layer model + plug-in pattern for context).

- [x] **Archive skim** — ls showed 232 files in archive/core/; grep -l hits for the 4 scoped paths + AGENT-NEUTRALITY.md returned dozens (foundational docs touched in nearly every migration/adoption epic). Load-bearing hits for this child: CORE-205.1.md (the filer), CORE-205.2.md + CORE-205.3.md (immediate siblings, zero-change verifications same day), CORE-154.* and CORE-198.* (prior neutrality epics that established the ledger + PLATFORMS pattern), CORE-207.md (recent model vocab), CORE-200.md (shell discipline), and historical migrations (CORE-129, 154.4, 169, 175, 186, 192, 193, 194.1 etc.) that touched MIGRATION/AGENTS-snippet. No file moves, renames, or regressions for these paths since .1; the 205 siblings confirm the sweep is incremental hygiene only. No prior .4-specific notes (as expected — this child was filed today).

- [x] **Drift check** — PLAN.md line for CORE-205.4 still exactly matches the scope filed in CORE-205.1 (the 4 files + "Claude-only framing" language); live files on disk match the cited names/paths. AGENT-NEUTRALITY.md intentional table still lists MIGRATION.md (as "the Claude Code adoption guide today") and AGENTS-snippet.md (wiring verifier) with carve-outs for future platforms; no post-.1 drift in the surfaces themselves. "Claude Code" mentions in verify steps remain the exact framing the child was scoped to address. No line-number or name drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (2026-05-25). Explicit assumptions (consistent with .2/.3 pattern and .1 Resolved scoping):
  - This is a point-in-time hygiene/verification pass (same day as .2/.3); any findings will be small carve-outs or parentheticals in adopter-facing prose, not behavior or structural changes.
  - Will consult AGENT-NEUTRALITY.md ledger before any edit; intentional Claude surfaces (e.g. MIGRATION as Claude adoption guide) stay untouched or get only "future platforms" notes.
  - ft-new-project's `CLAUDE.md exists` precondition and global ~/.claude/skills install steps are out of scope (they are bootstrapper / wiring-layer details for the operator's current agent env, not the adopter contract layer consumed via AGENTS.md).
  - Verify steps ("type /ft-task in a fresh Claude Code session") are the primary actionable sites; rephrase to agent-neutral while preserving the "fresh session + slash menu" UX fact.
  - Post-edit, Phase 4 doc-drift sweep will record the exact one-line updates (or "no change") for MIGRATION.md, claude/AGENTS-snippet.md, and any other AI-referenced docs touched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Sweep findings (adopter-docs neutrality / Claude-only framing in adopter surfaces, 2026-05-25):**

- **Overall state:** Good baseline neutrality already present thanks to prior epics (154/198/205.1). MIGRATION.md and AGENTS-snippet.md explicitly list multi-agent consumers ("Claude Code, Codex CLI, Cursor, Sourcegraph Amp, Aider, and Grok Build") in the paste-block and adoption prose. The AGENT-NEUTRALITY ledger correctly scopes MIGRATION as the current Claude Code guide with forward pointer to PLATFORMS for future platforms.

- **Actionable framing sites that could confuse non-Claude adopters following docs verbatim:**
  1. `docs/MIGRATION.md:136`: "In a fresh Claude Code session in the project, type `/ft-task`." — Literal instruction assumes Claude Code UI. (Also 1.7 verify + §3.9 smoke test at :287 "fresh Claude session".)
  2. `claude/AGENTS-snippet.md:47`: "To verify: type `/ft-task` in Claude Code." — Same, in the wiring section adopters are told to open.
  3. `claude/skills/ft-new-project/SKILL.md:139` (and hand-off): "type `/ft-task` in a fresh Claude Code session in the project root." — Bootstrapper hand-off to adopter.
  4. `ft-new-project` Step 0 precondition (CLAUDE.md check) + global install recipe in MIGRATION §1.0 — These describe the operator's invocation environment (Claude Code global skills), not the adopter's runtime; low confusion risk but worth a parenthetical note on "your agent's equivalent memory file / global skills dir".
  5. `ft-flowtron/SKILL.md:69`: "Claude Code wiring layer" in the AGENT-NEUTRALITY desc — Factual (the ledger itself uses the term); acceptable as-is per ledger.

- **No other leaks found in scope:** The core paste-block in AGENTS-snippet is already agent-neutral (mentions model tokens, Grok [light] example, "whatever assistant the adopter uses"). ft-flowtron roster and key-docs list are clean. No new unapproved Claude assumptions since .1/.3.

- **Pattern from siblings:** .2 and .3 were pure verification (zero edits). .4 has a small number of high-signal framing sites in the exact adopter docs the epic scoped. Carve-outs will be minimal, one-line, consistent with existing multi-agent phrasing elsewhere in the files.

- **Recommendation:** Proceed with 2-3 targeted one-line neutralizations in the verify/hand-off steps. No impact on contract or wiring. This tasknote + Phase 4 drift entries become the formal record.

**Verdict on the epic questions for this child:** The adopter docs (MIGRATION + wiring snippets + bootstrapper hand-off + roster) are the primary on-ramp for Codex/Grok/Cursor users. The verify instructions are the only remaining literal "Claude Code session" framing that a non-Claude user could trip over. Adding carve-outs here completes the adopter-neutrality hygiene for CORE-EPIC-205 without touching intentional surfaces.

Discovery surfaced no significant deviation from the .1-filed scope (no Re-scope/De-scope, zero clarifying asks, hygiene scope exactly as planned, matches .2/.3 zero-or-minimal-change pattern) → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

---

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — surveyed the same 4 target files + AGENT-NEUTRALITY + PLATFORMS.md + recent siblings for existing multi-agent phrasing patterns (MIGRATION.md:95/274 already lists "Claude Code, Codex CLI, Cursor, Sourcegraph Amp, Aider, and Grok Build"; AGENTS-snippet paste block is agent-neutral with Grok [light] example; PLATFORMS documents the symmetric plug-in). Reused the parenthetical carve-out style ("or the platform's equivalent...") for the 4 verify/hand-off sites. No new shape needed; hygiene only.
- [x] Implemented the minimal solution — 3 surgical one-line carve-outs (4 sites total):
  - claude/AGENTS-snippet.md:47 (wiring verify)
  - docs/MIGRATION.md:136 (main 1.7 verify) + :287 (smoke test)
  - claude/skills/ft-new-project/SKILL.md:139 (bootstrap hand-off)
  No other files touched; no behavior impact; intentional ledger surfaces untouched.
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Edits (minimal, 2026-05-25):**
- All changes are adopter-facing prose only; global skill bootstrap details (CLAUDE.md check) left as-is per Phase 1 assumptions.
- Total diff: 4 lines changed across 3 files (all additions of neutral parentheticals; 0 removals of existing text).
- Pattern followed sibling hygiene: record + minimal carve-out where literal "Claude Code session" could mislead a Codex/Grok/Cursor user reading the adoption docs verbatim.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Targeted verification (doc-only hygiene):** Pre-edit: the Phase 1 greps + ls + full reads of the 4 targets + ledger + siblings + post-edit re-reads of the 3 changed files + re-grep for the old "fresh Claude Code session" phrasing (now zero occurrences in the edited verify sites). All "tests" passed; the carve-outs are present and the surrounding multi-agent lists remain intact.

**Lint / type-check equivalent:** Markdown mental-pass on edits (consistent em-dashes, no trailing spaces, wikilink style preserved, parentheticals match voice of nearby sentences in MIGRATION/AGENTS-snippet). The tasknote itself (phase checklists, frontmatter schema, Related wikilinks, Discovery Notes structure) matches sibling 205.2/205.3 and template. Passed.

**(frontend) visual confirmation:** N/A — no frontend / UI / visual surface touched (pure docs + skills prose). This tasknote + the 3 edited files are the sole artifacts; no rendered pages, components, or adopter-visible UI changed. (The 👁️ item is left for the record but does not apply; see .3 precedent.)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (see Final Summary)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/CORE-205.4.md`
- [x] Recap drafted (1-2 sentence plain-English summary + technical detail; bundled at Step 6)

**Final Summary:**

**Adopter-docs neutrality hygiene complete for CORE-EPIC-205.4.** Added 4 minimal carve-outs across docs/MIGRATION.md (2 sites), claude/AGENTS-snippet.md (1), and claude/skills/ft-new-project/SKILL.md hand-off (1) so Codex/Grok/Cursor users following the adoption docs no longer encounter literal "fresh Claude Code session" instructions for invoking `/ft-task`. 3 files touched, ~4 lines net add, zero behavior or contract impact. Follows the zero-edit verification pattern of .2/.3; intentional Claude surfaces per AGENT-NEUTRALITY ledger untouched.

**Doc-drift sweep (AI-referenced docs from _project/tasknote/README.md):**
- README.md — no change
- SPEC.md — no change
- docs/MIGRATION.md — updated: 2 carve-outs in §1.7 verify (line ~136) and §3.9 smoke (line ~287) for agent-neutral "fresh session with your coding agent (Claude Code, Cursor, Grok Build, Codex CLI, etc.; or platform equivalent)"
- claude/AGENTS-snippet.md — updated: 1 carve-out in "One-time symlink wiring" verify (line 47) using identical neutral phrasing
- docs/CONVENTIONS.md — no change
- CONTRIBUTING.md — no change
- SECURITY.md — no change
- docs/AGENT-NEUTRALITY.md — no change (ledger remains authoritative; no new intentional surfaces or out-of-scope updates from this child)
- docs/PLATFORMS.md — no change

(Note: the ft-new-project/SKILL.md edit is not part of the default cold-start sweep per _project/tasknote/README.md; it is lazy-loaded contract-adjacent prose.)

**PLAN.md .4 stub:** `- [x] **CORE-205.4** [grok] | adopter-neutrality-docs — Completed 2026-05-25.`

**Tasknote archive:** `git mv` to `_project/tasknote/archive/core/CORE-205.4.md`; **Archived:** 2026-05-25

**Archived:** 2026-05-25

