---
title: dogfood-render-outcome
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: [CORE-892]
touches:
  - docs/DOGFOOD.md
---

# CORE-893 | dogfood-render-outcome

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-892]]

## 🎯 Goal

Make the dogfood cue-render outcome something the operator reports, so a session no longer confirms glyph rendering it cannot see.

## ✅ Acceptance

- [x] Step 2 asks the operator once for the render outcome and no longer tells the session to confirm rendering or to note the CONFIRM bold itself — `! grep -q 'Confirm each renders' docs/DOGFOOD.md && ! grep -q 'note whether the bold renders' docs/DOGFOOD.md && grep -q 'ask the operator once' docs/DOGFOOD.md`
- [x] The Step 2 `Log:` cue-render sentence and the receipt fence's second line are the same sentence, and that line names the operator — `python3 -c "import re,pathlib; t=pathlib.Path('docs/DOGFOOD.md').read_text(); b=re.search(r'\`\`\`text\n(.*?)\n\`\`\`', t, re.S).group(1).splitlines(); log=re.sub(r'\s+',' ', re.search(r'Log: \`(Cue-render check complete\..*?)\`', t, re.S).group(1)); assert len(b)==4 and b[0].startswith('Contract comprehension complete.') and b[1].startswith('Cue-render check complete. Operator:') and b[2].startswith('Phase-1 drive complete.') and b[3].startswith('Proposed stamp:') and log==b[1]"`
- [x] `step-5-dogfood-sop.md` is untouched and still scores version, My row, and the Phase-1 drive — `git diff --exit-code -- claude/skills/ft-release/step-5-dogfood-sop.md && grep -q 'its Phase-1 drive names a task' claude/skills/ft-release/step-5-dogfood-sop.md`
- [x] `docs/AGENT-COMPAT.md` §"Reading the cells" still describes three `Log:` lines plus the proposed stamp and does not tell a session to confirm rendering — `grep -q 'three \`Log:\` lines verbatim plus the proposed stamp' docs/AGENT-COMPAT.md && ! grep -q 'Confirm each renders' docs/AGENT-COMPAT.md`

## 🧩 Subtasks

- [x] Reword Step 2 so the operator supplies the render outcome, including the CONFIRM bold
- [x] Reword the receipt cue-render line to that same sentence and keep the four-line fence
- [x] Check `docs/AGENT-COMPAT.md` §"Reading the cells" for a restatement of the self-observation
- [x] Leave `step-5-dogfood-sop.md`'s three checks as they are

## 🔗 Related

- [[CORE-892]] — v8.4.0 cut; Codex declined its receipt because Step 2 asked it to confirm glyph rendering it cannot observe

---

## ⚡ Notes

**Relevance:** Proceed. Step 2 still said "Confirm each renders", the receipt bracket still asked for "all glyphs rendered", and CORE-892 records Codex declining the v8.4.0 receipt for that reason.
**Archive skim:** Area `core` matches the README table. CORE-892 is the filing source. CORE-588 / CORE-613 lock the receipt as three `Log:` lines pasted verbatim plus the proposed stamp, scored on version, My row, and the Phase-1 drive. CORE-614 leaves the git-status clause unscored. The cue-render bracket is not one of those three checks.
**Drift check:** The cited paths match. `docs/DOGFOOD.md` Step 2 and the receipt fence put the render verdict on the session. `step-5-dogfood-sop.md` still names the three `Log:` lines and the three checks, and does not parse the cue-render bracket. The plan matches the PLAN.md line and does not contradict that check. `docs/AGENT-COMPAT.md` §"Reading the cells" restates the three-line receipt and the report-only rule; it does not tell a session to judge glyphs. `docs/PLATFORMS.md`'s Cursor footer is a past verification note, not a procedure.
**Clarifications:** No clarifications needed. Assumptions: one prose ask after the cue list; the operator's answer is pasted into the existing one-line bracket; the release walk keeps scoring only version, My row, and the Phase-1 drive, so this task does not add a fourth check; a session that still fills the bracket itself would still pass that walk.
**Pattern survey:** The receipt is already operator-pasted evidence (`docs/DOGFOOD.md` §"Reporting the result", `step-5-dogfood-sop.md` step 2). The render outcome joins that pattern: the session emits the cues, the operator reports what the surface showed, and the one-line bracket carries their words.
**Implementation:** Step 2 now asks the operator once, in prose, for which glyphs failed or that all rendered, whether the UPPERCASE fallback is legible, and how the CONFIRM bold rendered. The shared `Log:` sentence and the receipt fence's second line are that answer's bracket, prefixed `Operator:`. The fence stays four lines. `step-5-dogfood-sop.md` was not edited. §"Reading the cells" needed no edit: it already says three `Log:` lines verbatim plus the proposed stamp.
**Verification receipt:** criterion 1 (old self-confirm strings gone; `ask the operator once` present) → 0. Criterion 2 (four-line fence; collapsed `Log:` equals fence line 2, which starts `Cue-render check complete. Operator:`) → 0. `git diff --exit-code -- claude/skills/ft-release/step-5-dogfood-sop.md` → 0, and the Phase-1-drive grep → 0. AGENT-COMPAT three-line grep and absent `Confirm each renders` → 0. No privileged-ops keywords in the diff.
**External review:** Read-only review probe, no blockers. Note: the operator ask covered the CONFIRM bold, but the shared bracket gloss named only glyphs and the UPPERCASE fallback. Fixed in the same sentence (both the `Log:` and fence line 2); criterion 2 re-run → 0.
**N/A:** Best Practices — doc-only procedure reword, no code or module boundary. Docs — every `.flaitron/tasknote/README.md` §"AI-referenced docs" entry is no change. `docs/AGENT-COMPAT.md` §"Reading the cells" still describes the three-line receipt and does not restate the self-observation; `docs/PLATFORMS.md`'s Cursor footer is a past verification note. No Learnings.

**Final Summary:** A dogfood session now emits the cue list and asks the operator what rendered, including the CONFIRM bold, then pastes that answer into the receipt's cue-render line. The four-line receipt and the three checks in `step-5-dogfood-sop.md` are unchanged. Declared 1 file, changed 1 (`docs/DOGFOOD.md`). The tasknote and PLAN.md row are closure writes.

**Archived:** 2026-11-08
