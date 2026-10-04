---
title: caobunga-handoff-rows
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: [CORE-EPIC-598, CORE-598.1, CORE-598.2, CORE-598.3, CORE-565.3, CORE-565.N, CORE-597]
blocked-by:
  - CORE-598.3
---

# CORE-598.4 | caobunga-handoff-rows

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-598]] [[CORE-598.1]] [[CORE-598.2]] [[CORE-598.3]]

## 🎯 Goal

Compile the caobunga-side findings of this epic — and the three CBN rows [[CORE-565.3]] drafted that were never pasted — as ready-to-paste PLAN.md rows numbered from caobunga's next free ID at paste time, and close only after the operator confirms the paste from a caobunga session.

## ✅ Acceptance

- [x] Rows numbered from caobunga's actual next free ID, re-checked at paste time — `grep -o 'CBN-[0-9]*' ~/Code/caobunga/.flowtron/PLAN.md | sed 's/CBN-//' | sort -n | tail -1` → max ID + 1 is the first row's number
- [x] Every row parses under the task-line grammar, epic rows in caobunga's own `CBN-EPIC-N` / nested `CBN-EPIC-N.k` shape — `grep -cE '^ *- \[ \] \*\*CBN-(EPIC-)?[0-9]+(\.([0-9]+|N))?\*\* \[(light|medium|heavy)\] \| [a-z -]+ — ' .flowtron/tasknote/CORE-598.4.md` → 8
- [x] Every row's description is ≤ 70 words and every shortname ≤ 30 chars (SPEC/tasknote-selection.md filing-discipline cap; caobunga's stated bounds) — word / char count over the block in Testing Notes → max ≤ 70 / ≤ 30
- [x] Status-snippet move filed in epic shape (`CBN-EPIC-188` + `.1` discovery + `.N` audit, per caobunga's session), the parent citing `docs/EXTERNAL-AGENTS.md` step 9 (the anchor `.2` landed) and naming the gate it retires (CBN-154) — `grep -q 'step 9' docs/EXTERNAL-AGENTS.md && grep -c 'CBN-EPIC-188' .flowtron/tasknote/CORE-598.4.md` ≥ 3
- [x] Continue-prompt row names the verified anchors (`loop.CONTINUE_UNATTENDED`, `layout._probe_skill_dir`, CONTRACT §"Continue prompt") — `judgment`: verified by reading `loop.py:181-186` / `layout.py:41-73` this session (operator-approved, read-only)
- [x] CBN-148..150 re-emitted under fresh IDs with their original scope (`contract-provenance-refresh`, `blocker-resolution-archive` — shortened from `-plan-archive` to fit 30 chars — `continue-prompt-upstream-cite`), content re-verified at HEAD — `grep -c 'contract-provenance-refresh\|blocker-resolution-archive\|continue-prompt-upstream-cite' .flowtron/tasknote/CORE-598.4.md` ≥ 3
- [x] CBN-186 row cites the upstream fix by its owner section — `grep -q 'plain scalar' SPEC/blocked.md && grep -c 'plain scalar' .flowtron/tasknote/CORE-598.4.md` ≥ 1
- [x] **Operator pasted the rows from a caobunga session** (never prose-only; `.1` §F Q3) — conversational confirm in this session, then `grep -cE '\*\*CBN-(EPIC-188(\.1|\.N)?|189|190|191|192|193)\*\*' ~/Code/caobunga/.flowtron/PLAN.md` → 8 (read-only, path approved this session)
- [x] Every row that depends on a pinned surface cites the flowtron tag that carries it (v5.27.0 already pinned; v5.28.0 = the uncut Minor carrying `.2` + `.3`), so the rows read correctly after caobunga's `/ft-update` — `grep -c 'v5.2[78].0' .flowtron/tasknote/CORE-598.4.md` ≥ 5
- [x] No adopter ID in flowtron contract prose — `grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md templates --exclude=VERSION-HISTORY.md` → no hits

## 🧩 Subtasks

- [x] Phase 1: read caobunga `PLAN.md` (next free ID, open sections, CBN-148..150 status), CONTRACT §"Fleet boundary" / §"GitHub-facing status" / §"Flowtron reader" / §"Parse contract" / §"Run loop" / §"Continue prompt", `loop.py:170-195`, `layout.py` probe; re-read 565.3's row block and 565.N F2
- [x] Phase 2: draft the rows in Implementation Notes — `## High`: the status-snippet epic (`CBN-EPIC-188` + `.1` + `.N`); `## Low`: CBN-189..193 (continue-prompt path, continue-prompt cite, provenance, blocker-archive, CBN-186 cite)
- [x] Phase 2: word-count each description (≤70w), shortname ≤30, grammar-check each row
- [x] Phase 3: run the Acceptance receipts; print the paste block; wait for the operator's paste confirmation; re-read caobunga `PLAN.md` to verify eight rows landed
- [x] Phase 4: doc-drift sweep, PLAN stub flip (kept nested under CORE-EPIC-598), archive

## 🔗 Related

- [[CORE-EPIC-598]] — parent epic (flowtron-caobunga-concert)
- [[CORE-598.1]] — Discovery; §B#1 (status-file conflict), §B#3 (lost hand-off CBN-148..150), §B#6 (continue-prompt hardcodes the submodule path), §F Q1 / Q3 (snippet moves caller-side; paste is a closure condition)
- [[CORE-598.2]] — blocked-by (transitively): declared step 9 in `docs/EXTERNAL-AGENTS.md`, the anchor the status-snippet row cites; plain-scalar `park-reason:` rule, the upstream fix the CBN-186 row cites
- [[CORE-598.3]] — blocked-by: ratified `[handoff]`; the CBN rows cite the release carrying `.2` + `.3`
- [[CORE-565.3]] — authored CBN-148..150 (Final Summary, `:235-240`); re-emitted here
- [[CORE-565.N]] — F2: CBN row numbers go stale between draft and paste; number at paste time
- [[CORE-597]] — gitignored `caobunga-status.md`; the flowtron side of the conflict the status-snippet row resolves

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` and `.3` closed today, so both anchors the rows cite (step 9; the `[handoff]` ratification) exist at HEAD. On caobunga's side every finding still stands — the snippet-ignore gate still refuses a target that ignores `caobunga-status.md`, the continue prompt still hardcodes the submodule path, the three 565.3 rows were never pasted (their IDs are now unrelated closed rows), and the CBN-186 fallback still explains the deviation without an upstream fix to cite. The hand-off is the work; nothing in the PLAN line has moved.

- [x] Read relevant source files — flowtron: `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" steps 6 + 9, §"Stable surfaces for callers" (trailing-run + `[handoff]` rows, out-of-contract bullet), `SPEC/blocked.md:118-120` (plain-scalar rule), `SPEC.md` (core), archived [[CORE-598.1]] / [[CORE-598.2]] / [[CORE-598.3]] (whole), [[CORE-565.3]] `:225-247` (row block). caobunga (operator-approved this session, read-only, named files): `.flowtron/PLAN.md` (headings, open sections, max ID, CBN-148/149/150/154/156/186/187 rows), `docs/CONTRACT.md` at `:530` §"Fleet boundary", `:957-965` §"GitHub-facing status", `:1037` §"Flowtron reader", `:1094-1098` §"Parse contract", `:1300` §"Run loop", `:1383` §"Continue prompt"; `backend/caobunga/loop.py:170-195`; `backend/caobunga/flowtron/layout.py:32-108` (grep), `grammar.py:27,35`, `close.py:561`, `selection.py:605` (grep).

- [x] **Best Practices Review** — `N/A` — no code changes in either repo. The one boundary in play — flowtron writes nothing into caobunga (`SPEC.md` §"Cross-repo edit remit"; [[CORE-598.1]] §F Q3) — is why the deliverable is a paste block the operator carries across, not an edit.

- [x] **Archive skim** — no `touches:` (no file deliverable here — see the last box); path-less grep instead: `grep -l 'CBN-148' archive/core/*.md` → [[CORE-565.3]], [[CORE-565.N]] (both read: the row block at `565.3:235-241`; F2 at `565.N:98,125` — number at paste time); `grep -l 'caobunga-status' archive/core/*.md` → [[CORE-597]] (read via `.1` §D / `.2` Related: untrack + gitignore stands). The three epic siblings read whole. No ⚠️ pointers, no `supersedes:` on any of them.

- [x] **Drift check** — every item in the PLAN line re-verified at HEAD this session: (a) **status snippet** — flowtron `.gitignore` still ignores `caobunga-status.md` (an untracked copy sits at the repo root, so caobunga still writes it); CONTRACT `:957-965` still overwrites + path-commits it in the worker repo, `:1300` (CBN-154) still refuses an ignoring target at exit 2, `:530` still calls it "the one write outward"; step 9 landed in `.2`. (b) **continue-prompt path** — `.1` §B#6 said "verify, then fix": verified — `loop.py:181-186` `CONTINUE_UNATTENDED` hardcodes `.flowtron/core/claude/skills/ft-task/unattended-mode.md`; `layout._probe_skill_dir` (`:41`) already resolves the flowtron-self dir for `supports_unattended` (`:52-73`), so the probe says True for flowtron-self while the prompt names a path that does not exist there; CONTRACT `:1383` mirrors the hardcoded text. (c) **CBN-148..150** — IDs taken by `hermes-output-capture` / `cohort-line-count-drift` / `agents-pin-pointer`; the three shortnames absent from caobunga's PLAN (open + Completed); every claim they fix still stands (`CONTRACT:1037` "prose flowtron wrote … no notion of the `[unattended]` marker"; `close.py:561`; `grammar.py:27,35`; `selection.py:605` still acknowledges `PLAN-ARCHIVE.md` unread; `CONTRACT:1383` still explains the deviation). One thing moved: v5.27.0 (tagged 2026-09-12) carries 565.3 (committed 09-10) and caobunga pins v5.27.0 — so the re-emitted CBN-150 is **no longer pin-blocked**. And `.3` ratified `[handoff]`, so the re-emitted CBN-148's third claim (`grammar.py:35` "filed upstream separately"; `CONTRACT:1094` "reads the token permanently unratified") changes from "de-scoped" to "ratified in the release carrying `CORE-598.3`". (d) **CBN-186** — `CONTRACT:1098` still explains the line-wise fallback by the writer bug alone; the plain-scalar rule at `SPEC/blocked.md:118` is the upstream fix to cite. Cross-artifact: the plan contradicts no SPEC contract (§"Cross-repo edit remit": file it there, do not edit it from here — satisfied by design; §"Deferred hand-off filing": the paste is a closure condition, not prose). Matches the PLAN line; no Re-scope.

- [x] Asked clarifying questions — one AskUserQuestion round, two answers: (1) path approval → **yes**: `~/Code/caobunga/.flowtron/PLAN.md`, `docs/CONTRACT.md` (named sections), `backend/caobunga/loop.py` (read-only, this session); (2) placement → **status-snippet row under `## High`, the rest under `## Low`**. Assumptions carried: (a) rows cite "the flowtron release carrying `CORE-598.2` / `CORE-598.3`" rather than a version number — the Minor release `.3` classed is not cut yet, and 565.3 used the same form; (b) the `[handoff]` ratification folds into the re-emitted provenance-refresh row rather than a seventh row — same file, same wording-only class; (c) no `[unattended]` token on any row — flowtron never writes it, and these are caobunga rows the operator seeds in caobunga's own session; (d) the paste confirmation is conversational assent in this session, verified by a read-only grep of caobunga's PLAN afterwards.

- [x] Subtasks above populated with concrete, ordered steps; YAML `touches:` **omitted** — no file deliverable in this repo (the rows live in this note, which reconciliation excludes by construction; the paste lands in caobunga through the operator).

**Discovery Notes:**

### A. Caobunga state at read time (2026-09-14)

- Max filed ID **CBN-187** (`visual-park-visibility`, closed today) → next free **CBN-188**. `## High` / `## Medium` / `## Low` hold no open rows (comment blocks only), so the paste opens both sections.
- CBN-148 / 149 / 150 are `hermes-output-capture` (09-10) / `cohort-line-count-drift` (09-11) / `agents-pin-pointer` (09-11) — 565.3's rows were drafted the same day CBN-148 closed and never pasted. F2 confirmed.
- Pin: `.flowtron/core` at v5.27.0, which carries [[CORE-565.3]] (step 6 "Two caller paths", `PLAN-ARCHIVE.md` in the closed-row set, `SPEC/blocked.md` dead-end retraction). It does **not** carry `.2` / `.3` (unreleased at HEAD).

### B. Row design (eight rows — one epic of three + five singles; numbers confirmed from caobunga's session: CBN-188 next free)

| # | Section | Shortname | Source | Cites |
|---|---|---|---|---|
| EPIC-188 + .1 + .N | High | `status-snippet-caller-side` / `status-snippet discovery` / `status-snippet audit` | `.1` §B#1, §F Q1; caobunga's session sized it epic (surfaces: CONTRACT §"GitHub-facing status" `:957`, §"Run loop" gate `:1300` + exemption `:1298`, §"Target-tree report" `:1365`, §"Fleet boundary" `:530`; `github.py`, `presence.py:103/183`, `loop.py:491`, `cli.py:381`, `close.py:567`) | EXTERNAL-AGENTS step 9 (v5.28.0); CBN-154; CORE-597 |
| 189 | Low | `continue-prompt-core-less-path` | `.1` §B#6, verified §(b) above | `loop.CONTINUE_UNATTENDED`; `layout._probe_skill_dir`; CONTRACT §"Continue prompt"; CBN-156 |
| 190 | Low | `continue-prompt-upstream-cite` | 565.3 CBN-150, pin-block dropped | EXTERNAL-AGENTS step 6; `SPEC/blocked.md` §"Resuming an interrupted run" (v5.27.0) |
| 191 | Low | `contract-provenance-refresh` | 565.3 CBN-148, extended | CONTRACT §"Flowtron reader" + §"Parse contract"; `close.py`; `grammar.py`; release carrying `.3` |
| 192 | Low | `blocker-resolution-archive` | 565.3 CBN-149, unchanged in substance | `selection.completed_task_ids`; EXTERNAL-AGENTS §"Stable surfaces for callers" (v5.27.0) |
| 193 | Low | `park-reason-upstream-fix-cite` | `.1` §B#2, `.2` deliverable | `SPEC/blocked.md` §"Park reason" plain scalar (release carrying `.2`); CONTRACT §"Parse contract" CBN-186 paragraph |

Order within `## Low`: the two continue-prompt rows adjacent (189 fixes a path, 190 fixes a citation in the same section — kept separate because one changes `loop.py` and one is doc-only), then the three provenance rows.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-565.3]]'s hand-off shape exactly: a fenced `markdown` block of ready-to-paste rows in flowtron's task-line grammar, `[<model>]` on every row, ≤30-char shortname, one section label per block. Two differences, both from the epic Discovery: numbered from caobunga's *verified* next free ID (565.N F2), and the paste is an Acceptance line rather than Final-Summary prose (`.1` §F Q3).

- [x] **Minimal refactor gate** — `N/A` — no code in either repo; the rows *describe* caobunga-side refactors (CBN-188 retires a gate) for caobunga's own cycle to judge.

- [x] Implemented the minimal solution — six rows drafted below; `.1`'s four items map to 188 / 189 / (190 + 191 + 192) / 193.

- [x] Updated/added tests for non-trivial behavior — `N/A` — no executable surface; the grammar + word-count checks are Phase 3 receipts.

**Implementation Notes:**

**Ready-to-paste CBN rows** — one block, verbatim (the `<!-- ## High -->` / `<!-- ## Low -->` lines mark the section each group lands in). Numbered from caobunga's next free ID, confirmed from its own session (**CBN-188**; re-check `max ID + 1` at paste time). Flowtron writes nothing there. The status-snippet move is epic-sized on caobunga's side (five code surfaces + four CONTRACT sections), so it files in caobunga's own epic shape — `CBN-EPIC-188` + `CBN-EPIC-188.1` + `CBN-EPIC-188.N`, mirroring its `CBN-EPIC-16` cohort — not as one row. No `[unattended]` token on any row — seeding is the operator's act in caobunga's session. Rows that depend on a pinned surface cite the tag: **v5.27.0** (already pinned) or **v5.28.0** — the Minor release `.3` classed (`SPEC/versioning.md`), *not cut yet*; it will carry `.2` + `.3` once `.N` closes, so caobunga's `/ft-update` to it is what makes 188 / 191 / 193 actionable.

```markdown
<!-- ## High -->
- [ ] **CBN-EPIC-188** [heavy] | status-snippet-caller-side — Move `caobunga-status.md` out of the worker repo: flowtron v5.28.0 (`docs/EXTERNAL-AGENTS.md` step 9) declares a caller commits nothing of its own into a producer repo, and flowtron already gitignores the file (CORE-597). Write the last-run card caller-side (or opt-in per registry entry); retire the snippet-ignore gate (CBN-154), the snippet dirt exemption, and the CONTRACT §"Fleet boundary" carve-out. Unblocks flowtron as a dispatch target.
  - [ ] **CBN-EPIC-188.1** [heavy] | status-snippet discovery — Scope the move across CONTRACT §"GitHub-facing status", §"Run loop" (snippet-ignore gate + exemption), §"Target-tree report", §"Fleet boundary" and `github.py`, `presence.py`, `loop.py`, `cli.py`, `close.py`; decide caller-side home vs per-registry opt-in; file the implementation children.
  - [ ] **CBN-EPIC-188.N** [medium] | status-snippet audit — Final-subtask audit per flowtron SPEC/epic.md (fixed doc-drift sweep acceptance line); confirm no caobunga write into a target repo remains outside the worker's own closure and filing commits.
<!-- ## Low -->
- [ ] **CBN-189** [light] | continue-prompt-core-less-path — `loop.CONTINUE_UNATTENDED` and CONTRACT §"Continue prompt" hardcode `.flowtron/core/claude/skills/ft-task/unattended-mode.md`; a core-less target (flowtron-self, CBN-156) has it at `claude/skills/ft-task/unattended-mode.md`, so `supports_unattended` proves the file present via `layout._probe_skill_dir` while the prompt names a path that does not exist there. Render the path from the same probe dir; mirror the wording in CONTRACT.
- [ ] **CBN-190** [light] | continue-prompt-upstream-cite — Flowtron v5.27.0 (already pinned) declares the prose-continue path for a stranded `in-progress` note contract-legal: `docs/EXTERNAL-AGENTS.md` step 6 "Two caller paths"; `SPEC/blocked.md` §"Resuming an interrupted run" no longer calls it a dead end. Update CONTRACT §"Continue prompt" to cite the declaration instead of explaining the deviation. Wording only.
- [ ] **CBN-191** [light] | contract-provenance-refresh — Stale claims about flowtron, wording only: CONTRACT §"Flowtron reader" and `close.py` call `**Suggested next task:**` "prose flowtron wrote" with "no notion of the `[unattended]` marker" (flowtron never writes that line; `[unattended]` captured since v5.22.0); `grammar.py`'s marker comments and CONTRACT §"Parse contract" call `[handoff]` "permanently unratified" — flowtron v5.28.0 ratifies it as the second canonical trailing token. No behavior change.
- [ ] **CBN-192** [light] | blocker-resolution-archive — `selection.completed_task_ids` resolves `Blocked by [[ID]]` against `PLAN.md` only; flowtron's `## Completed` rotation moves checked rows verbatim to `.flowtron/PLAN-ARCHIVE.md` (adopter-general, `docs/MIGRATION.md`), and flowtron v5.27.0 `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" declares the closed-row set as both files. A rotated blocker still denies but loses the `(completed; clause is stale, remove it)` annotation. Read both files, or record the gap in CONTRACT §"Flowtron reader".
- [ ] **CBN-193** [light] | park-reason-upstream-fix-cite — CBN-186's line-wise `park-reason:` fallback was forced by flowtron's writer emitting YAML-unsafe prose; flowtron v5.28.0 fixes it upstream — `SPEC/blocked.md` §"Park reason" makes the value a YAML plain scalar (no `: `, no ` #`, no trailing `:`) at every writer. Cite that fix in the CONTRACT §"Parse contract" CBN-186 paragraph; keep the fallback as defense in depth. Wording only.
```

Provenance per row: EPIC-188 (+ .1 / .N) ← `.1` §B#1 / §F Q1 + `.2` step 9, epic-sized by caobunga's session · 189 ← `.1` §B#6, verified this session · 190 ← 565.3 CBN-150 (pin-block dropped: v5.27.0 carries 565.3) · 191 ← 565.3 CBN-148 (third claim updated: `[handoff]` ratified by `.3`) · 192 ← 565.3 CBN-149 (unchanged in substance; version pinned) · 193 ← `.1` §B#2 + `.2` plain-scalar rule.

Word counts (after the first ` — `): EPIC-188 62 · .1 33 · .N 27 · 189 48 · 190 47 · 191 59 · 192 61 · 193 59 — all ≤ 70. Shortnames 20–30 chars (`.N` and 192 trimmed to fit).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — no code changed in either repo; the row block is checked by grammar regex + word count (receipts below).

- [x] Ran lint/type-check on changed code — `N/A` — markdown only; trailing-whitespace grep on this note → none.

- [x] **Verification receipt** — see Testing Notes. Structural: no duplication (each finding is one row; the `[handoff]` ratification folds into the provenance row rather than a seventh), no dead prose, every row cites the section that owns the claim.

- [x] (frontend) Asked the user for visual confirmation — `N/A` — no rendered surface changed. The operator act this task *does* need is the paste, recorded as its own Acceptance line and confirmed conversationally (receipt below).

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
caobunga next free ID (from its own session; confirmed by read)  max CBN → 187                  → first row = CBN-188
grep -cE '^ *- \[ \] \*\*CBN-(EPIC-)?[0-9]+(\.([0-9]+|N))?\*\* \[(light|medium|heavy)\] \| [a-z -]+ — ' <note> → 8
word count after first ` — ` per row   → EPIC-188:62 · .1:33 · .N:27 · 189:48 · 190:47 · 191:59 · 192:61 · 193:59  (max 62 ≤ 70)
shortname length per row               → 26 · 24 · 20 · 30 · 29 · 27 · 26 · 29  (max 30 ≤ 30)
grep -q 'step 9' docs/EXTERNAL-AGENTS.md && grep -c 'CBN-EPIC-188' <note>                → 0 / 6   (≥ 3)
grep -c 'contract-provenance-refresh\|blocker-resolution-archive\|continue-prompt-upstream-cite' <note> → 8  (≥ 3)
grep -q 'plain scalar' SPEC/blocked.md && grep -c 'plain scalar' <note>                    → 0 / 4   (≥ 1)
grep -c 'v5.2[78].0' <note>                                                                 → 13  (≥ 5)
grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md templates --exclude=VERSION-HISTORY.md → 1  (no hits — pass)
grep -cE '[[:space:]]$' <note>                                                              → 0   (no trailing whitespace)
judgment: continue-prompt anchors — loop.py:181-186 CONTINUE_UNATTENDED hardcodes the path; layout.py:41 _probe_skill_dir, :52-73 supports_unattended uses it → verified this session, and independently confirmed by caobunga's session ("fix", not "verify, then fix")
paste check (pre-paste)  grep -cE '\*\*CBN-(EPIC-188(\.1|\.N)?|189|190|191|192|193)\*\*' ~/Code/caobunga/.flowtron/PLAN.md → 0   (before the paste)
paste check (post-paste) grep -cE '^ *- \[ \] \*\*CBN-(EPIC-188|188\.1|188\.N|189|190|191|192|193)\*\*' ~/Code/caobunga/.flowtron/PLAN.md → 8   (operator confirmed; caobunga's session renumbered the two children from `CBN-EPIC-188.k` to its `CBN-188.k` shape — its call, the only edit; header Suggested next task → CBN-188.1)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 / 18 walked; **no change** on every entry (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). Nothing in flowtron changed — the deliverable is text carried into caobunga by the operator; `docs/EXTERNAL-AGENTS.md` is *cited* by the rows, not edited.

- [x] Closed — every Acceptance criterion ticked; YAML `status:` → `completed`; PLAN.md `.4` line flipped to stub form, kept nested under `CORE-EPIC-598` in `## High` (epic child placement invariant); tasknote moved to `.flowtron/tasknote/archive/core/`. No superseded-claim pointer: [[CORE-565.3]]'s row numbers were a record at draft time (565.N F2 already says so), not a falsified claim.

- [x] **Evidence-based recap** drafted — see Final Summary; surfaces inline on the 📦 conditional skip (one tasknote + one PLAN.md stub; no privileged-ops surface).

**Final Summary:**

Closed the flowtron → caobunga hand-off that [[CORE-565.3]] drafted and lost: eight PLAN rows, numbered from caobunga's verified next free ID and pasted from caobunga's own session, are now open work there instead of Final-Summary prose here. The status-snippet conflict that leaves flowtron un-dispatchable by caobunga is filed as an epic on the side that owns the fix (`CBN-EPIC-188`, citing `docs/EXTERNAL-AGENTS.md` step 9 from `.2`); the continue-prompt path bug, the 565.3 trio (with the `[handoff]` ratification from `.3` folded in), and the CBN-186 upstream-fix cite are five singles under `## Low`. Every row that depends on a pinned surface names its flowtron tag — v5.27.0 (pinned) or v5.28.0 (the uncut Minor carrying `.2` + `.3`).

- **Changed (flowtron):** `.flowtron/PLAN.md` (`.4` stub flip), `.flowtron/tasknote/archive/core/CORE-598.4.md` (this note). No contract, doc, or code edits.
- **Landed (caobunga, by the operator):** `## High` — `CBN-EPIC-188` + `CBN-188.1` + `CBN-188.N`; `## Low` — `CBN-189..193`; header `Suggested next task` → `CBN-188.1`. Caobunga's session renumbered the two children to its `CBN-188.k` shape — the only edit to the block.
- **Verification:** 8 / 8 rows grammar-checked; max description 62w (≤ 70), max shortname 30; every Acceptance grep green (receipts in Testing Notes); post-paste read-only grep of caobunga's PLAN → 8; adopter-ID grep over flowtron contract prose → no hits.
- **Refactors:** none.
- **Documentation:** 18 / 18 sweep entries no change.
- **`touches:` reconciliation:** `N/A — no file deliverable` (omitted at Phase 1; `git diff --name-only` shows PLAN.md + this note only, both excluded by construction).
- **Follow-through, filed where it belongs:** v5.28.0 must actually be cut after `CORE-598.N` for `CBN-EPIC-188` / `191` / `193` to become actionable via caobunga's `/ft-update` — the `.N` audit + `/ft-release` carry that; no separate flowtron row needed.
- **Maintainability effect:** the one recurring failure of this concert — findings about caobunga recorded in flowtron archives and never acted on — now has a closure condition (the paste) instead of a hope, and the caller-write boundary is a filed epic on the side that must honour it.

**Archived:** 2026-09-14
