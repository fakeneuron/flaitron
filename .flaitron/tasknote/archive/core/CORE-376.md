---
title: spec-omissions-mirror
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: []
---

# CORE-376 | spec-omissions-mirror

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix `SPEC.md`'s "PR / suggestion archetypes" bullets that falsely claim to
mirror a bullet "above" in SPEC.md's own §"What flowtron does NOT provide"
list, when the mirrored bullet actually only exists in `docs/VISION.md`.

## ✅ Acceptance

- [ ] SPEC.md:704-706 no longer claim "mirror of ... above" for bullets that
      don't exist above in SPEC.md's own §"What flowtron does NOT provide" list
- [ ] The three affected bullets (Runtime security scanners, LLM
      knowledge-base, Loop runners) correctly point to `docs/VISION.md` as
      the source they mirror, distinct from bullets 700/702 which genuinely
      do mirror a same-document "above" bullet

## 🧩 Subtasks

- [ ] Re-verify the drift: confirm bullets 700/702 genuinely mirror an
      "above" bullet in SPEC.md, and bullets 704-706 do not
- [ ] Reword bullets 704-706 to stop claiming "above" and instead correctly
      attribute the mirror to `docs/VISION.md` §"What we won't accept"
- [ ] Verify final wording resolves accurately for all six bullets

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Doc-only citation-accuracy fix; drift confirmed by reading
  both SPEC.md and docs/VISION.md live. No design tradeoffs.

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A, doc-only prose edit, no code/module boundaries touched

- [x] **Archive skim** — `archive/core/` skimmed for prior tasknotes touching
  `SPEC.md`'s "What flowtron does NOT provide" / PR-rejection list or
  `docs/VISION.md`; CORE-375 (citation-drift fix in AGENT-NEUTRALITY.md) is
  the closest precedent in shape but doesn't touch these specific sections.
  No prior tasknote directly relevant.

- [x] **Drift check** — re-read SPEC.md:675-706 and docs/VISION.md:28-44 live.
  Confirmed: SPEC.md's own list (§"What flowtron does NOT provide", lines
  679-691) contains only 4 bullets — CLI tool, Schema validation, database
  backend, cross-project query API, per-project CI hooks — it has **no**
  "Runtime security scanners", "LLM knowledge-base", or "Loop runners"
  bullets. Those three phrases exist only in docs/VISION.md's §"What we
  won't accept" list. So SPEC.md:704-706's "PR-rejection mirror of ... above"
  wording is factually wrong for those three (there is no "above" match);
  it's only correct for line 700 (Schema validators mirrors line 686
  "Schema validation" above) and line 702 (Cross-project query layers
  mirrors line 688 "Cross-project query API" above). Task description's
  citations (lines 704-706, docs/VISION.md §"What we won't accept") all
  confirmed accurate — no further drift beyond what's already filed.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: the fix should correct the false
  "above" claim for the three affected bullets without restructuring the
  rest of the list, matching the narrow scope of the filed PLAN.md entry.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Confirmed via direct read of SPEC.md:675-706 and docs/VISION.md:28-44:

- SPEC.md §"What flowtron does NOT provide" (lines 677-691) lists exactly
  5 omissions: CLI tool, Schema validation, database backend, cross-project
  query API, per-project CI hooks.
- SPEC.md §"PR / suggestion archetypes..." (lines 700-706) has 6 bullets.
  Bullets 700 and 702 say "PR-rejection mirror of ... above" and correctly
  point at same-document bullets (686, 688). Bullets 701 and 703
  (Abstractions, Multi-user/team) make no "above" claim at all. Bullets
  704-706 (Runtime security scanners, LLM knowledge-base, Loop runners) also
  say "mirror of ... above", but no such bullet exists above in SPEC.md —
  the phrase only exists in docs/VISION.md's §"What we won't accept".
- Root cause: SPEC.md's short list (5 items) and VISION.md's longer
  PR-rejection list (6 items) don't have 1:1 coverage — VISION.md documents
  3 additional rejection categories that never made it into SPEC.md's
  shorter §"What flowtron does NOT provide" list. The "above" wording was
  copy-pasted from the two bullets where it's true onto the three where
  it isn't.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending the existing bullet-list prose pattern
  already used in this exact section; no new shape needed.

- [x] **Minimal refactor gate** — N/A, no refactor; targeted prose correction only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc fix, no testable logic

**Implementation Notes:**

Edited SPEC.md:704-706, replacing "PR-rejection mirror of \"X\" above" with
"PR-rejection mirror of \"X\"" + explicit `docs/VISION.md` §"What we won't
accept" citation, for all three affected bullets. Left bullets 700-703
untouched (700/702 already correctly cite "above"; 701/703 make no mirror
claim).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only doc edit, no test surface
- [x] Ran lint/type-check on changed code — N/A, markdown only
- [x] **Quality assertions** — re-read the edited section; all six bullets
  now make accurate mirror claims (700/702 correctly say "above" for a
  same-document match; 704-706 correctly cite docs/VISION.md instead).
- [x] (frontend) N/A — no frontend surface

**Testing Notes:**

Re-verified by reading SPEC.md:696-706 post-edit: each bullet's "mirror"
claim now resolves to a real citation target (either "above" in the same
document, or an explicit docs/VISION.md pointer).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — SPEC.md is a core always-loaded doc, not itself
  listed in `.flowtron/tasknote/README.md` §"AI-referenced docs" as a
  separate ripple target; no other doc references this specific "above"
  wording.
- [x] Closed — PLAN.md line flipped to stub form, moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`
- [x] **Evidence-based recap** drafted

**Final Summary:**

Fixed SPEC.md:704-706's false "mirror of ... above" claim for three
PR-rejection bullets (Runtime security scanners, LLM knowledge-base, Loop
runners) that don't actually have a corresponding "above" bullet in SPEC.md's
own §"What flowtron does NOT provide" list — the phrase they mirror only
exists in `docs/VISION.md` §"What we won't accept". Reworded all three to
cite `docs/VISION.md` explicitly instead of falsely claiming "above". Left
the two genuinely-mirroring bullets (Schema validators, Cross-project query
layers) untouched. No code changes; no tests affected.

Maintainability effect: future readers of SPEC.md's PR-rejection list will
no longer be misled into searching SPEC.md itself for a bullet that isn't
there.

**Archived:** 2026-07-27
