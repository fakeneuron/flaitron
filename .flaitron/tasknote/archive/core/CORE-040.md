---
title: PLAN.md filing discipline
status: completed
priority: Future Opportunities
area: core
tags: []
created: 2026-05-05
due:
related-tasks: [CORE-037]
---

# CORE-040 | PLAN.md filing discipline

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-037]]

## 🎯 Goal

Sharpen the SPEC threshold for when a PLAN.md long description must be promoted to a starter tasknote, update the `/starter-task` and `/task` skills to flag long filings at filing time, and verify existing PLAN.md entries respect the threshold.

## ✅ Acceptance

- [x] SPEC.md §"When to use a tasknote (and when not to)" carries an explicit ≤50w target / ≤70w hard cap rule for PLAN.md long descriptions
- [x] SPEC.md `Version` header bumped v0.6.0 → v0.6.1 (patch — clarification only)
- [x] `claude/skills/starter-task/SKILL.md` Step 5 has a threshold-check sub-block that word-counts the proposed PLAN.md one-liner and pushes back if >50w (with a >70w-override path)
- [x] `claude/skills/task/SKILL.md` Step 1 surfaces a one-line advisory if the long description exceeds 70w (informational; non-blocking)
- [x] Sweep finding recorded: zero existing active long-descriptions exceed the 70w hard cap (longest is CORE-031 at 50w)

## 🧩 Subtasks

- [x] Edit SPEC.md §"When to use a tasknote (and when not to)" — extend "File a starter when:" + "Skip the starter when:" blocks with the threshold rule
- [x] Bump SPEC.md `Version` header to v0.6.1
- [x] Edit `claude/skills/starter-task/SKILL.md` Step 5 — add Threshold-check sub-block
- [x] Edit `claude/skills/task/SKILL.md` Step 1 — append the advisory warning paragraph
- [x] Type-check viz (`npx tsc --noEmit` in `viz/`); run viz tests (`npm test`)
- [x] Phase 4 closure — PLAN.md flip + archive + recap

## 🔗 Related

- [[CORE-037]] — workflow token-cost audit (predecessor; filed this task and the threshold prescription via post-closure structural prompt)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-037 closure post-mortem already prescribed exact thresholds (≤50w / ≤70w), exact surfaces (SPEC + two skills + sweep), and exact version bump (patch). The discipline gap is real (the audit itself filed CORE-036/038/039 with 100-300w inline prose before being corrected via dogfood pass) and the codification is small + load-bearing for future filings.

- [x] Read relevant source files — SPEC.md (full), `claude/skills/starter-task/SKILL.md`, `claude/skills/task/SKILL.md`, `_project/PLAN.md`, `_project/tasknote/archive/core/CORE-037.md`, `templates/tasknote-template.md`
- [x] **Drift check** — all surfaces named in the task description exist at the cited paths. SPEC §"When to use a tasknote (and when not to)" sits at SPEC.md:540-568 with an existing parallel structure ("File a starter when:" / "Skip the starter when:") that the new threshold extends naturally. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Clarifications resolved (AskUserQuestion):**
  - Threshold numbers: ≤50w target / ≤70w hard cap (verbatim from CORE-037 prescription).
  - SPEC location: extend §"When to use a tasknote (and when not to)" — keep one canonical filing-discipline home; do not introduce a new top-level section.
  - `/task` behavior: advisory one-line warning at Step 1 (post-locate, pre-Step 1.5) when long description >70w; informational only, does not block scaffolding (the task is already filed by then).
  - `/starter-task` behavior: at Step 5, word-count the proposed PLAN.md one-liner; if >50w trim before writing; if >70w document the override rationale in the starter body.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**PLAN.md sweep (drift-checked count of all active long-descriptions):**

| Section | ID | Words | Status vs. 70w cap |
|---|---|---|---|
| Medium | CORE-016 | 40 | ok |
| Medium | CORE-031 | 50 | at-target (longest) |
| Medium | CORE-032 | 48 | ok |
| Medium | CORE-033 | 28 | ok |
| Medium | FE-009 | 24 | ok |
| Medium | FE-010 | 21 | ok |
| Medium | FE-012 | 43 | ok |
| Low | CORE-EPIC-009 | 44 | ok |
| Low | FE-014 | 37 | ok |
| Future Opp. | FE-002 | 29 | ok |
| Future Opp. | CORE-036 | 22 | ok (recently dogfooded to starter) |
| Future Opp. | CORE-038 | 26 | ok (recently dogfooded to starter) |
| Future Opp. | CORE-039 | 29 | ok (recently dogfooded to starter) |
| Future Opp. | CORE-040 | 31 | ok (this task's filing line) |
| Future Opp. | CORE-041 | 21 | ok |

**Finding:** zero outliers above the 70w hard cap. Longest is CORE-031 at exactly 50w (the soft target). The recent CORE-037 dogfood pass converted CORE-036/038/039 from 100-300w inline-prose lines to ≤30w one-liners with starter bodies, so the sweep arrives in clean shape. No PLAN.md edits required for the sweep itself.

**Design decisions logged:**

1. **Threshold-rule home — extend §"When to use a tasknote (and when not to)" rather than carve a new section.** The section already gates "tasknote vs. line-only" and "starter vs. line." Adding the word-count threshold there keeps a single canonical filing home.
2. **Advisory vs. blocking in `/task`.** The task is already filed by the time `/task <ID>` runs — pestering the user for a starter conversion at scaffold time is too late and friction-heavy. Advisory one-liner is the right shape; it nudges future filing discipline without blocking work.
3. **Enforcement vs. citation in `/starter-task`.** The skill writes the PLAN.md one-liner at Step 5 itself, so word-counting at write time is cheap and precise. Adding a Threshold-check sub-block (with a >70w-override escape hatch documented in the starter body) is the strongest place to enforce.
4. **Patch bump per CORE-037 prescription.** The change is a clarification of an already-qualitative rule — no parser/schema/template change. v0.6.0 → v0.6.1.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing parallel "File a starter when:" / "Skip the starter when:" bullet structure in §"When to use a tasknote (and when not to)" rather than introducing a new section. SPEC already uses table-shaped threshold layouts (e.g., §"Task-line format" segment table, §"Blocked tasks" two-signals table) — adopted the same shape for the threshold table. Skill changes mirror existing Step-level "**Decision check.**"-style sub-blocks already present in `/task` Step 1.5 model gate and `/starter-task` Step 5 placement notes — same imperative voice, same depth.
- [x] Implemented the minimal solution — three edits + version bump (no other surfaces touched)
- [x] Updated/added tests for non-trivial behavior — n/a (doc-only edit; no code surface affected)
- [x] Ran targeted tests on changed files — see Phase 3

**Implementation Notes:**

**SPEC.md edits** (`/Users/fakeneuron/Code/flowtron/SPEC.md`):

1. **Version header** bumped v0.6.0 → v0.6.1 (line 3) — patch per CORE-037 prescription (clarification of an already-qualitative rule; no parser/schema/template change).
2. **§"When to use a tasknote (and when not to)"** — added explicit threshold language to the existing parallel bullet blocks:
   - `**File a starter when:**` gained a leading bullet: "The PLAN.md long description would exceed **~50 words (target) or 70 words (hard cap)** — richer context belongs in the starter body, not on the line"
   - `**Skip the starter when:**` first bullet refined to: "The long description fits inside ~50 words (a scannable one-liner)"
3. **New `### PLAN.md filing-discipline thresholds` sub-section** appended at the end of §"When to use a tasknote" — table with three ranges (≤50w / 51-70w / >70w) and the corresponding action; carve-out explicitly noting `## Completed` lines are out of scope (CORE-036 owns that track); pointer to the two skill files for the mechanism.

**`/starter-task` SKILL.md edit** (Step 5):

Appended a `**Threshold check (filing discipline).**` sub-block. Word-counts the long description (excluding the trailing `Filed with starter at ...` pointer); ≤50w proceeds; 51-70w surfaces the count + trims; >70w must trim or document the override rationale in the starter body under a "Why the line couldn't be trimmed" sub-heading. The escape hatch is deliberate — keeps the rule a hard cap with a documented override path rather than a soft norm.

**`/task` SKILL.md edit** (Step 1):

Appended a `**Filing-discipline check (advisory).**` paragraph between Step 1's grammar pointer and Step 1.5's model gate. If long description >70w, surface a one-line ⚠️ warning to the user. Non-blocking — the task is already filed and reworking the filing at scaffold time is too late; the warning nudges future filings. (Per Discovery design decision #2.)

**No PLAN.md edits required** — sweep finding from Phase 1 confirmed zero outliers above the hard cap. Longest active line is CORE-031 at 50w (exactly the soft target). The recent CORE-037 dogfood pass already brought the few prose-heavy lines into compliance.

**No template edits required** — the rule operates on the PLAN.md task line, not on tasknote bodies; templates are unaffected.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz/ test suite (sanity: confirms no collateral regression in the parser, since SPEC threshold prose changes don't touch parser logic but viz reads `_project/PLAN.md`/`SPEC.md` shape indirectly)
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit` in viz/ clean
- [x] (frontend) Asked the user for visual confirmation — n/a (doc-only edit; no UI surface changed)
- [x] Fixed all introduced issues — none

**Testing Notes:**

53/53 viz tests pass; `tsc --noEmit` clean. SPEC.md and skill SKILL.md changes are pure prose; they do not affect the markdown parser (`viz/src/parser.ts`), the tasknote frontmatter parser (`viz/src/tasknote.ts`), or any UI surface. The test run is a sanity check that nothing collateral moved.

No new tests added — the threshold rule is enforced at AI authoring time (skills' word-count step), not by code. There is no parser surface to test.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — SPEC.md (§"When to use a tasknote" extended + new threshold table sub-section + Version header bump); both skill SKILL.md files. No `MIGRATION.md` / release-notes update — release tag deferred to a follow-up per the CORE-029 / CORE-030 / CORE-024 pattern.
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-05`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Codified the PLAN.md filing-discipline threshold prescribed by [[CORE-037]]'s post-closure structural pass: ≤50 words target, 51-70w yellow flag, >70w hard cap → must move to a starter body. Three surfaces touched:

- **SPEC.md v0.6.0 → v0.6.1** — extended §"When to use a tasknote (and when not to)" with explicit threshold language in both bullet blocks, plus a new `### PLAN.md filing-discipline thresholds` sub-section (three-row table + `## Completed`-out-of-scope carve-out + skill pointers). Patch bump per CORE-037 prescription (clarification only; no parser/schema/template change).
- **`claude/skills/starter-task/SKILL.md` Step 5** — Threshold-check sub-block word-counts the proposed long description; trims at 51-70w; >70w must trim or document the override rationale in the starter body under a "Why the line couldn't be trimmed" sub-heading.
- **`claude/skills/task/SKILL.md` Step 1** — advisory ⚠️ one-liner when the located task line's long description exceeds 70w. Non-blocking by design — the task is already filed by the time `/task <ID>` runs; the warning nudges future filings rather than re-litigating past ones.

**Sweep finding:** zero existing active long-descriptions exceed the 70w hard cap. Longest is CORE-031 at 50w (exactly at the soft target). The recent CORE-037 dogfood pass converted the prose-heavy CORE-036/038/039 lines to ≤30w one-liners with starter bodies, so the sweep arrives in clean shape — no PLAN.md outlier edits required.

**Key decisions:**

1. **Single canonical home** — extended the existing §"When to use a tasknote (and when not to)" rather than carving a new section. The section already gates "tasknote vs. line-only" and "starter vs. line"; the word-count threshold is the third gate in the same family.
2. **Advisory in `/task`, enforcement in `/starter-task`** — `/task` runs after filing is done, so blocking would be too late; `/starter-task` writes the line itself, so word-counting at write time is precise and timely.
3. **Override path with documented rationale** — the >70w cap is hard but not absolute; the escape hatch (record the override under a sub-heading in the starter body) keeps the rule a contract rather than a soft norm and creates a paper trail for future audits.
4. **Patch bump, release tag deferred** — follows the CORE-029 / CORE-030 / CORE-024 pattern for SPEC version bumps (release tag is its own task).

Tests: 53/53 viz pass, `tsc --noEmit` clean. No code surface changed; the rule is enforced at AI authoring time.

**Archived:** 2026-05-05
