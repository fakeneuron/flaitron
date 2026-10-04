---
title: ft-release-7.2-extract
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-507, CORE-508]
touches:
  - claude/skills/ft-release/
---

# CORE-513 | ft-release-7.2-extract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-507]] [[CORE-508]]

## 🎯 Goal

Extract §7.2's tag-message-drafting section (2,375 bytes) out of `claude/skills/ft-release/SKILL.md` into a lazy sibling fragment, following the `step-7.1-standing-checks.md` idiom CORE-507 established, to restore real load-time headroom before the ~40k threshold.

## ✅ Acceptance

- [ ] `claude/skills/ft-release/SKILL.md` shrinks by ~2.3k (measure exact before/after byte counts), restoring meaningful headroom past the current ~1.2k margin
- [ ] §7.2's content (auto-draft tag message, sentinel check, VERSION-HISTORY entry) lives verbatim in new sibling `claude/skills/ft-release/step-7.2-tag-message.md`, moved losslessly (proven by diff against the original range)
- [ ] §7.2 in SKILL.md retains its `### 7.2 —` heading and dispatches a single Read of the fragment, mirroring the `step-7.1-standing-checks.md` fragment idiom
- [ ] Every §7.2 cross-reference inside SKILL.md (lines 256, 272, 284, 393, 402, 403) still resolves — all are section-level, none cite an internal line number
- [ ] No external doc cites `§7.2` or ft-release's current byte count — confirmed by grep; only hit is the PLAN.md description itself, which the closure stub replaces
- [ ] Directory-symlink wiring (`.claude/skills/ft-release`, `~/.claude/skills/ft-release`) carries the new sibling file with zero re-wiring
- [ ] Repo validation gates — `N/A` as written, same reasoning as CORE-507 (markdown-only change, `AGENTS.md` §"Validation" scopes to viz/fleet-updater); doc-drift sweep run over the 18-entry AI-referenced set instead

## 🧩 Subtasks

- [ ] Extract SKILL.md lines 291–339 (§7.2's body, excluding its own heading) verbatim → new `claude/skills/ft-release/step-7.2-tag-message.md`, with an H1 + fragment-header blockquote matching `step-7.1-standing-checks.md`'s shape
- [ ] Replace §7.2's body in SKILL.md with a one-line dispatch Read instruction, keeping the `### 7.2 —` heading
- [ ] Diff the fragment's content against the original SKILL.md range to prove losslessness
- [ ] Re-read the six §7.2 cross-references in SKILL.md and confirm each still makes sense post-edit
- [ ] Confirm both `ft-release` directory symlinks list the new file
- [ ] Measure final SKILL.md byte size; run the `.flowtron/tasknote/README.md` §"AI-referenced docs" doc-drift sweep

## 🔗 Related

- [[CORE-507]] — predecessor: split §7.1 into two sibling fragments with this exact idiom; explicitly de-scoped §7.2 on a ~36k size projection that landed at 38,824 instead, leaving only ~1.2k headroom
- [[CORE-508]] — sibling split (ft-epic-discovery + ft-close-epic) done the same session, same pattern

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Condition verified live and byte-exact. `claude/skills/ft-release/SKILL.md` is 38,824 bytes today (confirmed via `wc -c`), matching the filed number. §7.2 (`### 7.2 —` through the line before `### 7.3 —`) spans SKILL.md lines 289–339 and is 2,374 bytes — matching the filed 2,375b within a trailing-newline rounding, same pattern CORE-507 saw for §7.1. The precedent fragment shape (`step-7.1-standing-checks.md`) exists, is current, and applies cleanly to a single-fragment extraction (§7.2 has no A–K-style growth vector, so it does not need splitting the way §7.1 did).

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` full section map + §7.1/§7.2 bodies, `claude/skills/ft-release/step-7.1-standing-checks.md` (fragment-header shape to mirror), `.flowtron/tasknote/README.md` §"AI-referenced docs" (doc-drift sweep set).

- [x] **Best Practices Review** — Touched responsibility is the same as CORE-507: one file's *load shape*, not its behavior. §7.2's content moves verbatim with no semantic change. Dependency direction stays one-way (SKILL.md → fragment). No new abstraction — the fragment is content, not machinery, extending CORE-042.9's fragment shape exactly as CORE-507 did for §7.1. Unrelated cleanup (e.g. Step 5's ~10k, the next-largest section) stays out of scope.

- [x] **Archive skim** — `grep -rl 'claude/skills/ft-release' archive/core/*.md` → hits include:
  - [[CORE-507]] — direct predecessor; establishes the fragment shape (H1 + one-line back-ref blockquote + verbatim content), the parallel-Read dispatch idiom, and explicitly de-scoped §7.2 with the exact byte figure (2,375b) this task now extracts. Its Final Summary "two things the operator should know" #1 names this exact follow-up as a ~10-minute task.
  - [[CORE-508]] — sibling split (30–40k band) using the same CORE-507 pattern; confirms the idiom generalizes beyond `ft-release`.
  - [[CORE-400]] — canonical fragment-shape record (CORE-042.9's "H1 + 1-line back-ref + verbatim content"); confirms `<root>`-prefixed literal paths are correct here since `/ft-release` is flowtron-self-only.

- [x] **Drift check** — No drift. SKILL.md byte count (38,824), §7.2's byte range (2,374/2,375), and section boundaries (lines 289–339, next heading `### 7.3` at line 341) were verified live via `wc -c` and `sed`/`grep`, not recalled. `grep -rn "§7\.2"` across the repo (excluding archive and the file being edited) surfaced **zero** external citations — simpler than §7.1's case, which had six external hits. Internal scan of the §7.2 body for `above`/`below`/`this skill`/`same file`/`this step` found exactly one hit ("immediately below the horizontal rule... in `docs/VERSION-HISTORY.md`"), which points at a location in an external file, not a self-reference — no repair needed. The six internal SKILL.md mentions of `§7.2` (lines 256, 272, 284, 393, 402, 403) are all section-level and remain valid since the `### 7.2 —` heading stays in SKILL.md as the dispatch anchor. `grep` for the filed byte figures (`38,824`, `36,017`) found no other live doc citing them — the only hit is PLAN.md's own CORE-513 description, which Phase 4 closure replaces with the stub form.

- [x] Asked clarifying questions — none needed; explicit assumptions: (1) mirror `step-7.1-standing-checks.md`'s exact fragment-header shape rather than inventing a new one; (2) keep §7.2 as a single fragment (unlike §7.1's two-file split) since 2,375b is small and linear, not a multi-entry growth vector like the Pair A–K catalogue; (3) fragment filename `step-7.2-tag-message.md`, matching the existing `step-7.<n>-<slug>.md` naming.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Measured state (bytes, matching the filed units)

| Region | Lines | Bytes |
|---|---|---|
| `SKILL.md` total | 1–~430 | 38,824 |
| §7.2 body (heading through line before §7.3) | 289–339 | 2,374 |
| §7.3 onward (unaffected) | 341–end | — |

Projected `SKILL.md` after extraction: **~36,450 bytes** before dispatch-stub overhead (a one-line Read instruction, materially smaller than CORE-507's parallel-Read block since this is a single fragment, not two).

### Cross-reference sweep

No repairs needed — a smaller surface than CORE-507's six-repair, six-external-citation case:

- **External:** `grep -rn "§7\.2" --include="*.md"` across the repo, excluding `.flowtron/tasknote/archive/` and `ft-release/SKILL.md` itself, returned zero hits. Nothing outside `ft-release` cites §7.2 at any granularity.
- **Internal:** all six `§7.2` mentions inside SKILL.md are section-level (`Tag-message review (§7.2)`, `move on to §7.2`, `continue to §7.2`, `locked at §7.2`, `with the approved message from §7.2`, `§7.2 locked tag message's first line`) — every one resolves because the `### 7.2 —` heading is retained as the dispatch anchor, exactly as `### 7.1 —` was retained for the standing-checks split.
- **Self-references inside the moved body:** one "immediately below" hit, verified to describe a position in `docs/VERSION-HISTORY.md`, not the SKILL.md file being split — no rewrite required.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `step-7.1-standing-checks.md`'s fragment shape (H1 + one-line back-ref blockquote + verbatim content); no new shape invented.

- [x] **Minimal refactor gate** — only new content is the one-line dispatch stub replacing §7.2's body; the moved content is untouched verbatim.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no executable code changed, markdown only.

**Implementation Notes:**

Created `claude/skills/ft-release/step-7.2-tag-message.md` (2,617 bytes) carrying SKILL.md's former lines 291–339 verbatim, with an H1 + 3-line back-ref blockquote header matching `step-7.1-standing-checks.md`'s shape. Replaced §7.2's body in SKILL.md with a single dispatch line, keeping the `### 7.2 —` heading so all six existing `§7.2` cross-references (lines 95, 256, 272, 284, 345, 354, 355) stay valid — none cite an internal line number, all resolve at section granularity.

**Losslessness proved.** Diffed `git show HEAD:claude/skills/ft-release/SKILL.md` lines 291–339 against the fragment's body (post-header) — identical, zero differing lines.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown only; `AGENTS.md` §"Validation" scopes its commands to viz and the fleet updater, neither of which this touches (same reasoning as CORE-507).

- [x] Ran lint/type-check on changed code — `N/A`, same reason. No JS/TS touched.

- [x] **Quality assertions** — no duplication (proved by the diff above — the fragment is the sole copy, SKILL.md now holds only the dispatch line), no dead content, no unexplained complexity, no public-surface growth beyond the one new sibling file, stale-documentation actively checked rather than assumed clean (see doc-drift sweep below).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

**Testing Notes:**

**Size verified live:** `SKILL.md` 38,824 → **36,761 bytes** (−2,063, −5.3%), landing under the ~40k threshold with **~3.2k headroom** — up from the ~1.2k CORE-507 left. New fragment `step-7.2-tag-message.md` is 2,617 bytes (2,374 moved content + ~243 header overhead).

**Wiring verified.** Both `.claude/skills/ft-release/` and `~/.claude/skills/ft-release/` list the new file with identical size (36,761 / 2,617) — directory symlinks carried it with zero re-wiring, same as CORE-507 found.

**Cross-reference check re-run post-edit.** All six `§7.2` mentions inside SKILL.md (lines 95, 256, 272, 284, 345, 354, 355) re-read cleanly — every one is section-level and the `### 7.2 —` heading anchor is unchanged.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 entries walked (`claude/skills/*/SKILL.md` sits outside the sweep set per the README's own scope note, so `ft-release/SKILL.md` isn't a member); **all 18 no change**. Grepped every entry for "ft-release" — hits found only in `README.md`, `docs/PLATFORMS.md`, `codex/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `claude/AGENTS-snippet.md`, all citing §7.1 (unaffected) or `/ft-release` generically (no byte count, no §7.2 reference, no fragment count claim). `docs/PLATFORMS.md`'s "(+ lazy fragments)" wording already covers an arbitrary fragment count. `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — zero mentions of `ft-release`, no change.

- [x] Closed — every Acceptance criterion ticked/verified above. YAML `status:` → `completed` (next edit). PLAN.md line to be flipped to stub form and moved to top of `## Completed`. Tasknote to be moved to `.flowtron/tasknote/archive/core/CORE-513.md`.

- [x] **Evidence-based recap** drafted below.

**Final Summary:**

`claude/skills/ft-release/SKILL.md`'s §7.2 (tag-message drafting, sentinel check, VERSION-HISTORY entry) moved verbatim into a new sibling fragment, `step-7.2-tag-message.md`, following the exact idiom CORE-507 established for §7.1 — restoring headroom CORE-507 explicitly left thin.

**Changed:** 3 files. `claude/skills/ft-release/SKILL.md` (38,824 → 36,761 bytes, −2,063/−5.3%); new `step-7.2-tag-message.md` (2,617 bytes); `.flowtron/PLAN.md` + archive move.

**Verification:** extraction proved lossless by diffing `git show HEAD:…SKILL.md` lines 291–339 against the fragment's body — zero differing lines. All six `§7.2` cross-references inside SKILL.md re-read cleanly post-edit (all section-level, none cite an internal line number). Both `ft-release` directory symlinks (`.claude/skills/`, `~/.claude/skills/`) carried the new file with zero re-wiring, verified by size match. 18-entry doc-drift sweep found zero stale claims — simpler than CORE-507's case (one fix needed there) because no live doc cites §7.2 specifically or the pre-extraction byte count.

**Refactors:** none beyond the move — Step 5 (~10k, ft-release's next-largest section) stays out of scope, same as CORE-507 left it.

**Documentation:** 18 swept entries, 18 unchanged. `docs/PLATFORMS.md`'s existing "(+ lazy fragments)" wording already generalizes to the new file with no edit needed.

**Maintainability effect:** `SKILL.md` now carries ~3.2k of headroom before the ~40k threshold, up from the ~1.2k CORE-507 left — closing the exact gap its Final Summary flagged as a follow-up.

**Archived:** 2026-08-30
