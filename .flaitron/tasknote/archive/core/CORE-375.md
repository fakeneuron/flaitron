---
title: neutrality-ledger-currency
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: []
---

# CORE-375 | neutrality-ledger-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix drift in `docs/AGENT-NEUTRALITY.md`'s ledger table (stale `--fast` site
count, omitted skill names, unresolvable section citations) and fold in the
related `docs/PLATFORMS.md:127` bold-label mis-citation.

## ✅ Acceptance

- [ ] `--fast` row's site count matches actual SPEC.md occurrences (5, not 3), citing §"Loop tasks" and §"Post-closure protocol"
- [ ] `SPEC/tasknote-selection.md` row's skill list includes `/ft-spec` and `/ft-audit*`
- [ ] `SPEC/loop.md` heading citation matches the real heading text exactly
- [ ] `SPEC/epic.md` row no longer cites "Skills"/"Optional deep pre-pass" as if they were headings (they're bold labels)
- [ ] `SECURITY.md` row's truncated "..." citation is expanded to the full heading
- [ ] `docs/PLATFORMS.md:127`'s `§"Zero scripts"` citation no longer implies a real heading

## 🧩 Subtasks

- [ ] Edit AGENT-NEUTRALITY.md `--fast` row: 3→5 sites, add two section citations
- [ ] Edit AGENT-NEUTRALITY.md tasknote-selection.md row: add `/ft-spec`, `/ft-audit*`
- [ ] Edit AGENT-NEUTRALITY.md loop.md row: fix heading text
- [ ] Edit AGENT-NEUTRALITY.md epic.md row: reframe as bold labels, not headings
- [ ] Edit AGENT-NEUTRALITY.md SECURITY.md row: expand truncated heading
- [ ] Edit docs/PLATFORMS.md:127: drop false heading citation for "Zero scripts"
- [ ] Verify all edited citations resolve against current file content

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Doc-only citation-accuracy fix; all claims in the PLAN.md description independently verified against current file content (see Discovery Notes). No design tradeoffs.

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A, doc-only prose edits, no code/module boundaries touched

- [x] **Archive skim** — `archive/core/` skimmed for prior tasknotes touching `docs/AGENT-NEUTRALITY.md` or `docs/PLATFORMS.md`; none found touching these specific files' ledger content. No prior tasknotes directly relevant.

- [x] **Drift check** — all citations in the PLAN.md description re-verified live against current SPEC.md/SPEC/*.md/SECURITY.md/docs/PLATFORMS.md/docs/PHILOSOPHY.md content (grep + heading enumeration); no drift found in the task description itself — all claims accurate as filed.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: fixes should make each citation resolve to real, current heading/label text without expanding scope beyond what the PLAN.md line names.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Verified each claim in the PLAN.md long description against current repo state:

1. **`--fast` site count**: grepped `--fast` in SPEC.md and mapped hits to headings. Confirmed 5 distinct sections: §"Operator-gate cues" (L361), §"📝 Phase 1: Discovery" (L420), §"🧪 Phase 3: Testing & Linting" (L475/477), §"Loop tasks" (L526), §"Post-closure protocol" (L535). Ledger currently claims only 3 (missing the last two).
2. **tasknote-selection.md skill list**: ledger's flat list matches the file's frontmatter blockquote (L7) verbatim, but the file also names `/ft-spec` (L25, within §"When to use a tasknote") and `/ft-audit*` (L165, within §"`## Completed` archive convention" — the trivial-fix carve-out). Both omitted from the ledger row.
3. **loop.md heading**: actual heading is `## Runtime vs. contract — the boundary`; ledger cites it as just `§"Runtime vs. contract"` — doesn't resolve verbatim.
4. **epic.md "Skills"/"Optional deep pre-pass"**: confirmed these are bold-lead-in labels (`**Skills.**` L72, `**Optional deep pre-pass.**` L78) inside `## Audit acceptance — fixed doc-drift line`, not their own headings. Ledger cites them with `§` as if they were.
5. **SECURITY.md truncated citation**: real heading is `### Prompt injection via user-authored markdown`; ledger truncates to `§"Prompt injection ..."` with a literal ellipsis.
6. **docs/PLATFORMS.md:127**: cites `PHILOSOPHY.md §"Zero scripts"`, but "Zero scripts" is a bold label (`**Zero scripts.**` L41 in PHILOSOPHY.md), not a heading — same class of error as #4.

All six confirmed accurate; no drift between the ticket and current code. Proceeding with the fixes as scoped.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending the existing ledger-table row-editing pattern already used throughout `docs/AGENT-NEUTRALITY.md`; no new shape needed.

- [x] **Minimal refactor gate** — N/A, no refactor; straight prose/citation corrections only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc fix, no testable logic

**Implementation Notes:**

Six targeted edits: five in `docs/AGENT-NEUTRALITY.md` (ledger table rows), one in `docs/PLATFORMS.md` (inline citation). No other files touched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only doc edits, no test surface
- [x] Ran lint/type-check on changed code — N/A, markdown only
- [x] **Quality assertions** — re-grepped all six edited citations against current file content; every heading/label now resolves verbatim (see Testing Notes). No stale citations remain in the edited rows.
- [x] (frontend) N/A — no frontend surface

**Testing Notes:**

Verified via grep that each new citation target exists exactly as written:
`## Runtime vs. contract — the boundary` (loop.md:19), `### Prompt injection via
user-authored markdown` (SECURITY.md:17), `` ## `## Completed` archive
convention `` (tasknote-selection.md:141), `## Audit acceptance — fixed
doc-drift line` (epic.md:59). PLATFORMS.md:128 no longer uses `§` for the
"Zero scripts" bold label (confirmed still a bold label, not a heading, in
PHILOSOPHY.md:41).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/AGENT-NEUTRALITY.md` and `docs/PLATFORMS.md` are not themselves in `.flowtron/tasknote/README.md` §"AI-referenced docs"; no further doc-drift ripple from this citation-only fix.
- [x] Closed — PLAN.md line flipped to stub form, moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`
- [x] **Evidence-based recap** drafted

**Final Summary:**

Fixed six citation-drift issues in `docs/AGENT-NEUTRALITY.md`'s agent-neutrality
ledger table and one in `docs/PLATFORMS.md`, all verified against current file
content before and after the edit. No code changes; no tests affected.

- `docs/AGENT-NEUTRALITY.md`: 5 table-row edits (`--fast` site count 3→5 with
  two new section citations; `/ft-spec` + `/ft-audit*` added to the
  tasknote-selection.md skill list; loop.md heading citation corrected to
  match verbatim; epic.md row reframed to describe bold labels instead of
  fake headings; SECURITY.md truncated ellipsis expanded to the full heading).
- `docs/PLATFORMS.md:127-128`: dropped the false `§` heading citation for
  PHILOSOPHY.md's "Zero scripts" bold label.

No refactors needed or deferred — pure prose/citation corrections.
Maintainability effect: the ledger's citations are now trustworthy pointers
again, so future audits querying "is this reference still accurate" won't
need to re-derive the same drift.

**Archived:** 2026-07-27
