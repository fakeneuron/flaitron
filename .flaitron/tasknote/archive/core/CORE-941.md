---
title: paste-fence-opener-forms
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-920.2, CORE-930, CORE-937, CORE-938]
touches:
  - tools/update-adopters/text.mjs
  - SPEC/fixtures/workflow-block/cases.json
---

# CORE-941 | paste-fence-opener-forms

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-920.2]]

## 🎯 Goal

Settle that `workflowPasteBlock` opens the paste fence only on a column-0 backtick run, by documenting that narrower contract in code and pinning it with fixture cases.

## ✅ Acceptance

- [x] The `workflowPasteBlock` comment states the paste fence opens only on a column-0 run of 3+ backticks (not tildes, not indented) — `grep -q 'column 0' tools/update-adopters/text.mjs`
- [x] Fixture cases pin a tilde-opened and an indented `markdown` fence as not the paste fence — `grep -c 'is not the paste fence (CORE-941)' SPEC/fixtures/workflow-block/cases.json` prints 2
- [x] The updater suite passes — `node --test tools/update-adopters.test.mjs`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the column-0 / backtick-only clause to the `workflowPasteBlock` comment
- [x] Add the two fixture cases to `snippetCases`
- [x] Run the suite and drift checks

## 🔗 Related

- [[CORE-920.2]] — surfaced the gap in its External review
- [[CORE-938]] — the fixture cases and `ft-update` prose that already state the column-0 contract

---

## ⚡ Notes

**Relevance:** Proceed — the contract is already stated in `claude/skills/ft-update/SKILL.md` and the fixture `describes` text ("column 0 with 3+ backticks (not tildes)"), but the code comment omits it and no fixture pins it.
**Best Practices Review:** N/A — comment plus two data rows, no structural change.
**Archive skim:** CORE-920.2 surfaced this finding; CORE-930, CORE-937 and CORE-938 shaped the existing opener rules and cases. None conflicts.
**Drift check:** `text.mjs:76` matches `/^`{3,}[ \t]*markdown(?=\s|$)/`, as the PLAN line says. The plan matches its PLAN.md line and SPEC.
**Clarifications:** No clarifications needed. Assumption: document the narrower contract rather than align the opener. The snippet is a first-party file that is always a column-0 backtick fence, and aligning would also need `ft-update` Step 3.5 and the byte-contract fixtures changed, plus indent-stripping of the body.

**Pattern survey:** Extended the existing CORE-938 fixture cases in `snippetCases` and the header comment on `workflowPasteBlock`; no new shape.
**Implementation:** Documented the narrower contract instead of aligning the opener. The `workflowPasteBlock` comment now says the paste fence opens only on a column-0 run of 3+ backticks, and names `fenceOpeners` as the wider reader. Two `snippetCases` rows pin a tilde-opened and an indented `markdown` fence as `null`. The regex is unchanged, so `ft-update` Step 3.5 and the fixture `describes` text, which already say "column 0 with 3+ backticks (not tildes)", need no edit.
**Verification receipt:** `grep -q 'column 0' tools/update-adopters/text.mjs` → 0 · `grep -c 'is not the paste fence (CORE-941)' SPEC/fixtures/workflow-block/cases.json` → 2 · `node --test tools/update-adopters.test.mjs` → 125 pass, 0 fail · `node --check tools/update-adopters/text.mjs` → 0 · `bash tools/drift-checks.sh` → 0. No code path changed; no dead code or stale docs.
**N/A:** Best Practices — comment and data rows only · External review — the diff is a comment edit plus two fixture rows, too small to grade · Docs — no change (`ft-update` Step 3.5 and the fixture `describes` text already state the column-0 contract)

**Final Summary:** CORE-941 documented that `workflowPasteBlock` opens the paste fence only on a column-0 backtick run, and pinned that with two fixture cases (tilde-opened and indented fences are not the paste fence). The regex did not change. `touches:` matches the two files edited. The updater suite passes (125/125) and the drift checks pass.

**Archived:** 2026-11-24
