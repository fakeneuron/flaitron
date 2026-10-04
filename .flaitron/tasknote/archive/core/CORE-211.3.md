---
title: skill-gate-prose
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-211", "CORE-211.2"]
---
# CORE-211.3 | skill-gate-prose

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-211]] [[CORE-211.2]]

## 🎯 Goal

Apply minimal conservative cleanup to dense paragraphs or unclear instructions in ft-task, ft-epic-discovery, ft-close-epic, and ft-micro-task, specifically at gate banners, operator preview lines, and clarifying-question steps for improved scannability and agent neutrality.

## ✅ Acceptance

- [ ] The four target skill files (ft-task/SKILL.md + 3 fragments, ft-epic-discovery/SKILL.md, ft-close-epic/SKILL.md, ft-micro-task/SKILL.md + fragment) have measurably better scannability at their gate/banner/preview/clarifying sections via strategic line breaks before lists and key explanations, consistent bolding of tokens (e.g. `default-skip`, "preview line", "No clarifications needed"), and removal of the densest run-on paragraphs — without any semantic, trigger, or behavioral change.
- [ ] Two-banner limit, mandatory preview-line requirement, --fast carve-outs (including drift carve-out for Re-scope/De-scope), and per-skill flavor mapping (`default-skip` for /ft-task vs `default-fire-on-clarifications` for epic skills) remain explicitly stated and unchanged in force across the edited files.
- [ ] Clarifying-question step language ("genuinely ambiguous", "No clarifications needed" + explicit assumptions, AskUserQuestion usage) and the fast-mode variants stay clear and scannable; no instruction drift.
- [ ] Phase 4 doc-drift sweep records the precise one-line updates (skills are not in the README AI-referenced list per current README, so "no change" for the sweep; skill edits noted in recap); tasknote archived cleanly.

## 🧩 Subtasks

- [ ] Pattern survey of gate-related prose (Step 0 --fast arg handling + markers, Step 4 Phase1 exit + --fast interaction + clarifying instructions, Step 5/6 post-closure + suggestion UX, banner emission sites) across the 4 skills + fragments; cross-ref with .2 (SPEC tighten) and 208 precedent
- [ ] Identify concrete scannability opportunities limited to banners, previews, and clarifying steps per the .1 "worst-offenders-only" lock (dense paragraphs before lists or explanations of --fast / "No clarifications needed" / preview mandate)
- [ ] Apply minimal tighten edits (blank lines for breathing room in the most-scanned gate lists, bold key tokens on first strong mention, minor paragraph splits only where scanning is actively harmed) to the 4 skill surfaces only
- [ ] Verify two-banner ceiling, mandatory preview-line, all --fast semantics and carve-outs, and clarifying-step wording remain verbatim with zero rule impact
- [ ] Mental-pass hygiene + cross-ref check on edited skills (no accidental wording that could alter gate firing, fast-mode behavior, or ask patterns)
- [ ] Phase 3/4 auto: doc-only (no tests), markdown mental-pass as lint, doc-drift sweep (per README list), PLAN.md stub flip + archive move

## 🔗 Related

- [[CORE-EPIC-211]] — parent epic: gate-clarity-agent-neutral. Review flowtron for complete environment and agent neutrality with deep focus on clarity of user communication at every gate and phase transition.
- [[CORE-211.2]] — predecessor: contract-gates-spec (tightened the three core gate sections in SPEC.md for scannability).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the child exactly as filed by [[CORE-211.1]]: mechanical tighten of gate prose in the four named skills (ft-task, ft-epic-discovery, ft-close-epic, ft-micro-task) for scannability at banners, previews, and clarifying steps. Direct precedent in [[CORE-211.2]] (parallel SPEC contract tighten using identical conservative style) + 208.* cohort (agent-neutral skill-prose polish on post-closure text) confirms the edit pattern and "worst-offenders-only" bar. No drift in target language or gate concepts; the Step 0/4/5/6 sections in each skill are stable. No Re-scope or De-scope.

- [x] Read relevant source files — ft-task/SKILL.md (full Step 0 --fast handling + Step 4 default-skip exit gate + --fast interaction + clarifying imperatives + Step 6 post-closure) + its 3 fragments (step-1.5-model-edge.md, step-3a-promote-starter.md, step-3c-resume-blocked.md); ft-epic-discovery/SKILL.md (Step 5.5/6 clarifying + default-fire-on-clarifications flavor + Step 10 post-closure); ft-close-epic/SKILL.md (Step 4 clarifying + flavor + Step 9 parent-flip bundle); ft-micro-task/SKILL.md (Step 0 --fast + Step 3 clarifying + Step 5 override) + its step-1.5 fragment; plus [[CORE-211.1.md]] + [[CORE-211.2.md]] (scoping lock + precedent), SPEC/model.md + SPEC/epic.md, _project/tasknote/README.md (AI-referenced list + note that skills are on-demand only).

- [x] **Archive skim** — ls _project/tasknote/archive/core/ (250 files) + grep -l for source paths (ft-task/SKILL.md, ft-epic-discovery/SKILL.md, ft-close-epic/SKILL.md, ft-micro-task/SKILL.md and fragments). Load-bearing hits for gate prose: [[CORE-211.1]] (direct scoping parent; locked .3 to minimal conservative cleanup of "dense paragraphs in banners or missing line breaks before lists" with explicit "worst-offenders-only" policy), 208.* cohort (parallel conservative single-surface mechanical polish on skill prose after agent-neutral pass; same "no semantic change" discipline), [[CORE-183]] (origin of default-skip flavor, two-flavor table, --fast carve-outs now implemented in these skills' Step 4/5/6), 154.* (structured-ask / "genuinely ambiguous" / clarifying patterns that feed the Phase 1 "Asked clarifying questions" step). No file moves, regressions, or hard-link decisions affecting the 4 skill files or their gate-description locations. Earlier broad edits pre-154 too distant for relevant gate decisions.

- [x] **Drift check** — Task description cites exactly "ft-task, ft-epic-discovery, ft-close-epic, and ft-micro-task at banners, previews, and clarifying steps" — all four SKILL.md + the relevant fragments (step-1.5, 3a, 3c) exist at the expected paths with the gate language, --fast markers, "No clarifications needed", "preview line", banner emission, and flavor text matching what [[CORE-211.1]] scoped and what .2 tightened in the contract layer. No renames, line drifts, or terminology shifts since filing. The clarifying-step instruction block and post-closure suggestion UX (already agent-agnostic post-208) are current. Clean.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Explicit assumptions: (1) Edits confined to the four named SKILL.md files + their gate-related fragments only (per task title and .1 child split; command .md stubs and templates out of scope for .3). (2) "Minimal cleanup" / "dense paragraphs or unclear instructions" means the same conservative bar as .2 and 208: only the worst offenders (long run-on explanations of --fast interactions, missing breathing room before key gate lists, key tokens like `default-skip` or "preview line" lacking bold on first strong mention). (3) Zero semantic, trigger, banner-count, or behavior change — whitespace, line breaks, and emphasis only. (4) Two-banner limit, mandatory 1-2 sentence preview-line requirement, all --fast carve-outs (including Re-scope/De-scope drift carve-out), and "No clarifications needed + explicit assumptions" wording stay verbatim and prominent. (5) Follow exact precedent style: extend existing whitespace + bold-token hygiene; no new subsections, examples, or rewording of instructions.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Precedent + scoping lock (from .1 + .2):** [[CORE-211.1]] explicitly split the epic into single-surface mechanical children and locked the clarity bar at "only fix the worst offenders (dense paragraphs in banners or missing line breaks before lists). Minimal, conservative change." .2 executed the SPEC half of that lock with 3 blank-line insertions + 1 bold; net ~5 lines, zero rule impact. We inherit the identical discipline for the skill-side implementation of the same gate concepts.

**Archive skim + drift summary:** See checklist items above. The gate prose in the skills has been stable since 183 (flavor introduction) + 208 (agent-neutral pass left the core --fast / clarifying / banner language untouched). 211.1 scoped this .3 narrowly; no drift since then.

**Clarifying log:** Scope is narrow and locked. The judgment calls ("which paragraphs are dense enough?") stay inside the "worst offenders only" fence; no need to surface to user. Assumptions documented explicitly so any future reader can see the conservative intent.

**Phase 1 exit gate judgment (default-skip flavor for /ft-task):** Discovery surfaced no significant deviation from the original plan (zero clarifying asks surfaced; subtasks and assumptions are direct faithful refinements of the [[CORE-211.1]]-locked scope and .2 precedent; no change to target files, no new cross-cutting concerns, same conservative doc-polish approach). → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** The gate prose hygiene precedent is .2 (SPEC.md Operator-gate cues + Phase 1 exit flavors + Conditional skip rule: 3 blank lines in judgment bullets + 1 bold on "preview line" mandate) and the 208.* cohort (conservative agent-neutral polish on ft-task post-closure suggestion text and copy-paste helpers — same "extend whitespace + bold key token, zero semantics" pattern). The clarifying-step bullets and --fast interaction paragraphs in the 4 skills were the direct analogs of the "dense" sites .2 targeted in the contract layer. No precedent for larger reflows or new subsections inside the executable gate descriptions — we extend the existing minimal style exactly.

**Implemented (minimal tighten, 4 skill surfaces only):**
- ft-task/SKILL.md (clarifying step + --fast gate interaction):
  - Split the fast-mode variant sentence in the "Clarifying questions step" imperative onto its own indented line (improves scannability of the exact instruction operators follow when --fast is in play).
  - Added blank line + bolded **drift carve-out** in the **`--fast` interaction.** paragraph under the default-skip exit gate (the most frequently re-read gate explanation for /ft-task users; separates the "no-op for routine" rule from the carve-out + flag-stays-meaningful clause).
- ft-epic-discovery/SKILL.md (clarifying step):
  - Split the "Typical questions" clause in the **Clarifying questions** bullet onto its own line (parallel breathing room for the epic skill's higher-checkpoint clarifying path).

Net: 3 tiny, high-signal scannability edits. All confined to the exact sites named in the task (banners/gate logic, previews via the interaction text, clarifying steps). Zero rule text, zero trigger semantics, zero banner counts, zero --fast behavior, zero new content.

**Tests:** N/A (pure markdown skill contract edits). Verification was the Phase 3 mental-pass below.

**Phase 2 mental-pass (executed inline after edits):**
- All three edits touch only whitespace/line breaks or emphasis inside explanatory paragraphs for gate behavior and the clarifying-question rule.
- The two-banner limit language, mandatory preview-line requirement, default-skip vs default-fire-on-clarifications flavor mapping, all --fast carve-outs (including the Re-scope/De-scope drift carve-out), and "No clarifications needed" + "No clarifications needed (--fast)" wording are untouched and remain verbatim.
- Cross-refs (to SPEC §"Operator-gate cues", §"📝 Phase 1: Discovery", model.md) resolve cleanly.
- No trailing spaces introduced; list structure and code fences intact.
- Matches the conservative "worst-offenders-only" + "extend existing whitespace + bold" lock from .1/.2/208 exactly.
All boxes ticked. Ready for Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Doc-only changes to 3 locations inside claude/skills/ (ft-task/SKILL.md twice, ft-epic-discovery/SKILL.md once). No executable surface, no UI.

- "Targeted test suite": Phase 2 mental-pass (cross-refs to SPEC gate sections resolve; no rule text, trigger semantics, banner counts, or --fast / clarifying behavior altered; two-banner + mandatory preview-line invariants preserved verbatim). Equivalent verification for a documentation tighten.
- "Lint/type-check": Same mental-pass + visual diff review on the three edits. Markdown structure valid (lists, bold, backticks, line breaks, no trailing whitespace). The split clarifying bullets and added blank line in the --fast interaction paragraph render cleanly in GitHub and Obsidian.
- Frontend visual: N/A — claude/skills/*.md are not UI components (no viz/ or *.tsx touched; GitHub rendering of the skill source is incidental). No 👁️ prose ask emitted per SPEC §"🧪 Phase 3" (the 👁️ rule applies only to frontend changes). fast-mode=false is irrelevant here (no suppression opportunity exercised).

All verification complete. Flows directly into Phase 4 closure ops. No issues.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Recap (for 📦 bundle):**

Completed the `CORE-211.3` skill-gate-prose tighten. Three minimal scannability edits across the gate/clarifying prose in ft-task and ft-epic-discovery (clarifying-step bullet splits for fast-mode variant and typical-questions list; one blank line + bold on "drift carve-out" in the --fast interaction explanation under default-skip). Followed the exact conservative "worst-offenders-only" bar and whitespace+emphasis style locked by .1 and executed by .2. Zero semantic or behavioral change.

**Technical detail:**
- Files: `claude/skills/ft-task/SKILL.md` (2 small edits), `claude/skills/ft-epic-discovery/SKILL.md` (1 small edit). ft-close-epic and ft-micro-task needed no intervention under the minimal bar.
- Diff: 3 whitespace/emphasis changes; net ~6 lines improved for scanning.
- No other surfaces (SPEC.md already covered by .2; templates, docs, commands untouched per scoping).
- Key decision: only the clarifying-step instructions and the core --fast interaction paragraph in the primary /ft-task driver (plus parallel in the epic opener) qualified as "dense" enough; everything else already scannable.
- Verification: Phase 2 pattern survey + mental-pass (invariants preserved, cross-refs clean); Phase 3 hygiene review (doc-only, no 👁️ needed).

**Doc-drift sweep (Phase 4):**
- `README.md` — no change
- `SPEC.md` — no change (gate tighten was .2)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- (Note: the edited `claude/skills/*/SKILL.md` files are explicitly *not* part of the AI-referenced cold-start list per README §"AI-referenced docs"; they are on-demand authoritative surfaces. Their edits are recorded here in the recap only.)

**Archived:** 2026-05-26
