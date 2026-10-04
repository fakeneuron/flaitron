---
title: model-bullet-duplicate
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-510]
touches:
  - AGENTS.md
  - claude/AGENTS-snippet.md
---

# CORE-516 | model-bullet-duplicate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-510]]

## 🎯 Goal

Dereference the `[model]` bullet at `AGENTS.md:36` — which restates `claude/AGENTS-snippet.md:29` with no `KEEP IN SYNC` pairing and has already drifted — down to a one-line statement of the concept plus the `SPEC/model.md` pointer, and add the missing `KEEP IN SYNC` guard between the two bullets.

## ✅ Acceptance

- [ ] `AGENTS.md:36` and `claude/AGENTS-snippet.md:29` each state the `[model]` concept in one line and point at `SPEC/model.md` §"Model field" — neither restates the gate mechanics or the mismatch behavior the SPEC already carries
- [ ] A `KEEP IN SYNC` comment pairs the two bullets so future edits to one are checked against the other
- [ ] No fact CORE-495 or the SPEC contract states is lost — in particular `claude/AGENTS-snippet.md:29`'s "if the loaded model doesn't match, surface the mismatch before continuing" is preserved in substance (it's the adopter-facing behavioral cue, not restatement of gate internals)
- [ ] `SPEC/model.md` §"Model field" resolves as a real file + heading in this checkout

## 🧩 Subtasks

- [ ] Rewrite `claude/AGENTS-snippet.md:29` — one-line `[model]` statement + mismatch cue + `SPEC/model.md` §"Model field" pointer, drop the restated examples/defaults prose
- [ ] Rewrite `AGENTS.md:36` to match in shape and pair with it
- [ ] Add a `KEEP IN SYNC` comment pairing the two bullets (new pair, distinct from the existing `AGENTS.md:22` / `claude/AGENTS-snippet.md:9` pair which covers the peer-skill roster + path-convention bullets)
- [ ] Verify the `SPEC/model.md` §"Model field" pointer resolves; re-check char counts of both bullets

## 🔗 Related

- [[CORE-510]] — predecessor: established the dereference-not-restate pattern on `claude/AGENTS-snippet.md` (restate-then-cite bullet → one-line statement + SPEC pointer), extended here to a bullet CORE-510 didn't touch and to `AGENTS.md`'s mirrored copy

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited lines verify live at the stated locations. `AGENTS.md:36` and `claude/AGENTS-snippet.md:29` are the same `[model]` concept restated independently, with no `KEEP IN SYNC` pairing between them (the existing pair at `AGENTS.md:22` / `claude/AGENTS-snippet.md:9` covers different bullets — the peer-skill roster and path-convention list, not this one). The task is well-scoped and actionable as filed.

- [x] Read relevant source files — `AGENTS.md` (full), `claude/AGENTS-snippet.md` (full), `SPEC/model.md` (headings + §"Model field" body), `.flowtron/tasknote/archive/core/CORE-510.md` (the named precedent).

- [x] **Best Practices Review** — `N/A (no code)`: prose-only edit to two markdown docs. No module boundaries or abstractions in scope.

- [x] **Archive skim** — `grep -l "\[model\]"` over `.flowtron/tasknote/archive/core/` returns broad noise (most tasknotes mention the `[model]` tag in their own frontmatter roster). Narrowed to `grep -l "AGENTS.md:36\|AGENTS-snippet.md:29"`: no hits — this exact pair has not been touched before. Followed `[[CORE-510]]` directly (already read in full above). Load-bearing findings:
  - **CORE-510** is the direct precedent: same file pair, same "restate-then-cite → one-line + pointer" motion, plus the discipline of correcting/adding a `KEEP IN SYNC` comment in the same commit. It trimmed five *other* bullets in the paste-block (19/23/24/26/27) and explicitly deferred three more (20/21/22) as out of scope — the `[model]` bullet (its line 29, now unnumbered after edits but same content) was not one of the five it touched, so this task is picking up an adjacent case CORE-510 knowingly left alone.
  - **CORE-495** wrote the "if the loaded model doesn't match, surface the mismatch before continuing" clause in `claude/AGENTS-snippet.md:29` after correcting a prior overstatement elsewhere in the same paste-block (bullet 23, `--unattended`). No CORE-495 finding applies to bullet 29's own text directly, but its lesson — don't compress away a corrected behavioral cue — applies here: the mismatch-surfacing instruction is adopter-facing behavior, not SPEC-restated mechanics, so it must survive the trim.
  - **CORE-512** (sibling, same audit-context run) targets `AGENTS.md:16` density, a different line in the same file. No overlap.

- [x] **Drift check** — re-read both lines verbatim (quoted above in the task's own description) against current file state: `AGENTS.md:36` reads "Each PLAN.md task line carries a `[model]` segment (see `SPEC/model.md` §"Model field" for practical/agent-aware guidance and the model-mismatch surface cue). The task runs end-to-end on the tagged model." `claude/AGENTS-snippet.md:29` reads "Each PLAN.md task line carries a `[model]` segment (see `.flowtron/core/SPEC/model.md` §"Model field" for practical/agent-aware guidance, examples, and realistic defaults such as mid-tier models like Grok/Sonnet often `[medium]` (or `[light]` for mechanical work); adopters may use any short token). The task runs end-to-end on the tagged model. If the loaded model doesn't match, surface the mismatch before continuing." Confirms the PLAN line's claim: both already cite `SPEC/model.md` §"Model field" (so the pointer target is not new, matching CORE-510's five bullets which all already cited their target), but the snippet version carries three restated elements the self-host version compresses differently: (1) illustrative token examples and (2) a realistic-default guess ("Grok/Sonnet often `[medium]`") that duplicates guidance `SPEC/model.md` §"Practical guidance and agent-aware defaults" already owns, and (3) the mismatch-surfacing behavioral instruction, which is the one clause worth keeping since it's adopter-actionable and not present in the self-host line at all. `SPEC/model.md` §"Model field" (line 5) confirmed present; the gate mechanics (concrete-vs-category matching, mismatch block behavior) are fully spec'd there, so nothing about *how* the gate decides needs to appear in either bullet.

- [x] Asked clarifying questions — **No clarifications needed.** Explicit assumptions: (1) the mismatch-surfacing cue in the snippet bullet is adopter-facing behavior worth keeping in compressed form (not SPEC restatement) — CORE-495's history says compressing behavioral cues is the risky move, so it's kept as a short clause, not dropped; (2) the illustrative examples ("Grok/Sonnet often `[medium]`") are dropped — that's exactly the kind of guidance `SPEC/model.md` §"Practical guidance and agent-aware defaults" already owns in full, so restating an example here is the restate-then-cite pattern CORE-510 cuts; (3) the two bullets don't need to be textually identical — self-host and adopter framing differ elsewhere in these files (e.g. `/ft-release` vs `/ft-update`) — but they must state the same concept at the same altitude and share one `KEEP IN SYNC` comment.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Same restate-then-cite shape CORE-510 cut from five sibling bullets, found here in a sixth bullet CORE-510 didn't touch: a paragraph re-deriving guidance (illustrative model-token examples, a realistic-default guess) followed by a citation of the SPEC path that already owns that guidance in full (`SPEC/model.md` §"Model field" and §"Practical guidance and agent-aware defaults"). Both bullets already cite the target, so — as with all five of CORE-510's bullets — the pointer isn't new, only the restatement it should replace.

Unlike CORE-510's five bullets, this pair has never had a `KEEP IN SYNC` comment, which is exactly how the drift the PLAN line names was able to happen silently: the self-host guide's clause compresses to a bare pointer while the paste-block's clause keeps a behavioral instruction ("surface the mismatch before continuing") the self-host side lacks entirely. Trimming both to the same one-line-plus-pointer shape and adding the guard comment removes the drift and prevents recurrence in one move.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-510's exact shape on the same two files: one-line what-it-is statement plus the canonical `SPEC/model.md` §"Model field" pointer, matching the citation idiom the untouched neighboring bullets already use. Matched CORE-510's discipline of pairing the edit with a `KEEP IN SYNC` comment rather than leaving the two copies to drift silently again.

- [x] **Minimal refactor gate** — the only edit outside the two named bullets is the new `KEEP IN SYNC` comment. No other bullet touched; CORE-517/518/519 (sibling audit-context filings on other lines/sections of the same files) are explicitly out of scope.

- [x] Implemented the minimal solution — see Implementation Notes for exact before/after text.

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose-only change to two markdown docs; no behavior to test.

**Implementation Notes:**

`claude/AGENTS-snippet.md:29` (before, 578 chars incl. trailing space before next line):
> Each PLAN.md task line carries a `[model]` segment (see `.flowtron/core/SPEC/model.md` §"Model field" for practical/agent-aware guidance, examples, and realistic defaults such as mid-tier models like Grok/Sonnet often `[medium]` (or `[light]` for mechanical work); adopters may use any short token). The task runs end-to-end on the tagged model. If the loaded model doesn't match, surface the mismatch before continuing.

After:
> Each PLAN.md task line carries a `[model]` segment naming the model tier or name the task should run on end-to-end; adopters may use any short token. If the loaded model doesn't match, surface the mismatch before continuing. Contract: `.flowtron/core/SPEC/model.md` §"Model field".

`AGENTS.md:36` (before):
> Each PLAN.md task line carries a `[model]` segment (see `SPEC/model.md` §"Model field" for practical/agent-aware guidance and the model-mismatch surface cue). The task runs end-to-end on the tagged model.

After:
> Each PLAN.md task line carries a `[model]` segment naming the model tier or name the task should run on end-to-end; on mismatch, surface it before continuing. Contract: `SPEC/model.md` §"Model field".

Added a `KEEP IN SYNC` comment immediately above `claude/AGENTS-snippet.md:29` and its mirror immediately above `AGENTS.md:36`, each naming CORE-516 and the sibling line, so a future edit to the concept in one file is checked against the other. Kept separate from the existing `AGENTS.md:22` / `claude/AGENTS-snippet.md:9` pair, which guards a different bullet set (peer-skill roster + path-convention list).

Judgment call: dropped the illustrative examples ("Grok/Sonnet often `[medium]`") entirely rather than compressing them — `SPEC/model.md` §"Practical guidance and agent-aware defaults" is the canonical home for that guidance, and restating an example here is the exact restate-then-cite shape this task removes. Kept the mismatch-surfacing clause in both files now (previously only in the snippet) since it's adopter-actionable behavior, not gate-internal mechanics — matching CORE-495's precedent that behavioral cues shouldn't be silently dropped or asymmetric between the two mirrored files.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed. In place of a suite:
  - **Citation resolution** — `SPEC/model.md` §"Model field" confirmed present (heading at `SPEC/model.md:5`).
  - **KEEP IN SYNC pairing** — both comments present, each naming the other file's line and CORE-516.
  - **`/ft-release` §7.1 platform-snippet derivation check** — not affected: this edit is entirely inside the prose paste-block (mirrors CORE-510's finding that the `ln -s` wiring block, which that check reads, is untouched).

- [x] Ran lint/type-check on changed code — `N/A` for type-check (no code). Markdown hygiene verified directly: no trailing whitespace on either changed line, both files still end in a final newline (`.editorconfig`).

- [x] **Quality assertions** — reviewed the full diff: 4 changed lines (2 bullet rewrites + 2 new `KEEP IN SYNC` comments), all in scope. Removes duplication (drift between the two copies is now guarded) rather than adding it. No dead prose left behind. No public-surface growth. No stale doc-facing claim survives — both bullets now state the same concept and point at the same contract.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface; markdown-only change.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

No automated surface reads these two bullets' prose (only the `ln -s` wiring block in `claude/AGENTS-snippet.md` is machine-consumed, per CORE-510's Discovery finding, unaffected here). Verification is citation resolution + the new guard comment's presence, both confirmed above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 18 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". Grepped the full sweep set for the old bullets' distinctive phrases (`surface the mismatch`, `model-mismatch surface cue`, `Grok/Sonnet often`):
  - `AGENTS.md` — **updated** (this task's primary self-host target).
  - `claude/AGENTS-snippet.md` — **updated** (this task's primary adopter target).
  - All other 16 entries (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `codex/`, `cursor/`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`) — no change; the grep found no quote of either old bullet's text anywhere else in the sweep set.

- [x] Closed — all four Acceptance criteria met and ticked. YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`. No ⚠️ superseded-claim pointer written: this task corrected two stale statements in active files, not in an archived tasknote.

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut the drift between two independently-restated copies of the `[model]` PLAN-line convention — `AGENTS.md:36` (self-host) and `claude/AGENTS-snippet.md:29` (adopter paste-block) — down to a matching one-line statement of the concept plus a `SPEC/model.md` §"Model field" pointer in each, and added a `KEEP IN SYNC` comment pairing them so the drift can't recur silently.

**Verification.** No suite applies (prose-only). Citation resolution: `SPEC/model.md` §"Model field" confirmed present at `SPEC/model.md:5`. `KEEP IN SYNC` pairing confirmed present in both files, each naming CORE-516 and the sibling line. Doc-drift sweep (18 entries) found no other swept doc quoting either old bullet's text — only the two target files needed updates. `/ft-release` §7.1's platform-snippet derivation check is unaffected: this edit is entirely inside `claude/AGENTS-snippet.md`'s prose paste-block, not its `ln -s` wiring block.

**Refactors made / deferred.** Made: exactly the two bullets plus the new guard comment pair. Deferred: nothing — CORE-517/518/519 are sibling audit-context filings on other lines/sections of the same files and were left untouched.

**One judgment call worth recording.** Dropped the snippet bullet's illustrative examples ("Grok/Sonnet often `[medium]`") entirely rather than compressing them, since `SPEC/model.md` §"Practical guidance and agent-aware defaults" already owns that guidance in full — restating an example here was the exact restate-then-cite shape this task removes. Kept the mismatch-surfacing clause in *both* files now (previously only in the snippet), since it's adopter-actionable behavior rather than gate-internal mechanics, matching CORE-495's precedent against silently dropping a corrected behavioral cue.

**Documentation verdict.** 18-entry sweep: 2 updated (both this task's targets), 16 no change.

**Maintainability effect.** The two copies now state the same concept at the same altitude and carry a `KEEP IN SYNC` guard, so a future edit to one is checked against the other — closing exactly the silent-drift gap this task was filed to fix.

**Archived:** 2026-08-30
