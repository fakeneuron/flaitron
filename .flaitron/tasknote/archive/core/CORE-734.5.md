---
title: pair-f-retire
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.3, CORE-734.4, CORE-734.N, CORE-433.2, CORE-460.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - AGENTS.md
  - claude/AGENTS-snippet.md
  - claude/commands/ft-epic-discovery.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - docs/CONVENTIONS.md
  - tools/drift-checks.sh
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-734.5 | pair-f-retire

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-734]] · [[CORE-734.3]] · [[CORE-734.4]] · [[CORE-734.N]] · [[CORE-433.2]] · [[CORE-460.2]]

## 🎯 Goal

Stop five surfaces restating `/ft-file-followup`'s park-priority roster: each names `--park` and points at `SPEC/tasknote-selection.md`, so Pair F has nothing left to bind and retires to a stub, and the `pair_j`/`pair_m` exemption it justified is re-homed to the flags' real owners.

## ✅ Acceptance

- [x] The five mirrors no longer carry the roster. Verify: `grep -lE -e '--(low|fut)\b' docs/GLOSSARY.md docs/MIGRATION.md AGENTS.md claude/AGENTS-snippet.md claude/commands/ft-epic-discovery.md` prints nothing
- [x] Each of the five still names `--park` and reaches `SPEC/tasknote-selection.md` in the same bullet, row or sentence. Verify: `grep -c -e '--park' <file>` ≥ 1 each; pointer placement is `judgment`, read per surface
- [x] The owners keep the roster. Verify: `grep -q -e '--fut' SPEC/tasknote-selection.md claude/skills/ft-file-followup/park-mode.md claude/commands/ft-file-followup.md` → 0 each
- [x] Pair F is a retired stub and the letter count is unchanged. Verify: `grep -q '^\*\*Pair F — retired\.\*\*' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0; `grep -c '^\*\*Pair [A-Z]' …` → 17
- [x] Both KEEP IN SYNC comments drop the park-flag carve-out. Verify: `git grep -n 'Pair F' AGENTS.md claude/AGENTS-snippet.md` prints nothing
- [x] The `pair_m` exemption keeps its behavior and names its new owners; no live surface cites Pair F as an owner or idiom. Verify: `git grep -n 'Pair F' -- ':!**/archive/**' ':!docs/VERSION-HISTORY.md' ':!.flaitron/PLAN*.md'` → only the stub; `grep -q 'park-mode.md' tools/drift-checks.sh` → 0
- [x] The tree passes and the release directory shrinks. Verify: `bash tools/drift-checks.sh` → 0; `find claude/skills/ft-release -type f -exec cat {} + | wc -c` < 110,142

## 🧩 Subtasks

- [x] Mirrors: `docs/GLOSSARY.md` **sidequest**, `docs/MIGRATION.md` `ft-sidequest` row, `AGENTS.md` roster, `claude/AGENTS-snippet.md` roster, `claude/commands/ft-epic-discovery.md` see-also → `--park` + pointer
- [x] KEEP IN SYNC item 1 in `AGENTS.md` and `claude/AGENTS-snippet.md`: names-only, no exception
- [x] `tools/drift-checks.sh`: `pair_j` and `pair_m` comments re-home the exemption to `park-mode.md` §"Step P2" / `SPEC/tasknote-selection.md`; the named case stays
- [x] `step-7.1-mirror-pairs.md`: Pair F → retired stub; preamble release-only list; Pair I / J / K / M citations of F
- [x] `docs/CONVENTIONS.md` L58 / L66 release-only lists
- [x] Phase 3: Acceptance greps, full drift run, external review

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax)
- [[CORE-734.3]] — predecessor: the census that classified Pair F as collapsible and filed this child
- [[CORE-734.4]] — predecessor: retired Pair L; the stub shape and preamble edits this follows
- [[CORE-734.N]] — the audit that verifies 12 live Pairs, with F counted as retired
- [[CORE-433.2]] — related-decision: hand-fixed four roster sites, the drift Pair F was minted for
- [[CORE-460.2]] — related-decision: added the command-stub glob half of Pair F

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The census ([[CORE-734.3]]) found that only the skill's usage line and `SPEC/tasknote-selection.md` need the roster, and the other surfaces carry it only because Pair F demands it. The KEEP IN SYNC carve-out ("which the Pair F release gate requires") is circular. With a pointer in place of each copy, the drift class Pair F guards ([[CORE-433.2]], [[CORE-460.2]]) cannot arise.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read set.** Pair F's entry and every catalogue sentence citing F in `step-7.1-mirror-pairs.md`. The script header, `pair_j` and `pair_m`. The five mirror lines, both KEEP IN SYNC comments, `SPEC/tasknote-selection.md` L67–74, `park-mode.md` §"Step P2", the `ft-file-followup` stub, and `docs/CONVENTIONS.md` L58 / L66.
- **Live Pair F surfaces** (`git grep`, archives and VERSION-HISTORY excluded):
  - Owner claims to rewrite: the Pair F entry; the preamble's "D, F, I, K"; the KEEP IN SYNC item 1 in `AGENTS.md` and the snippet; the `pair_j` comment ("Pair F's job", "Pair F's `continue` idiom"); the `pair_m` comment and the `pair_m` catalogue line; CONVENTIONS L58 and L66.
  - Idiom citations in other entries: Pair I ("Pair F's `continue` idiom one level up"), Pair J ("Pair F does glob `claude/commands/*.md`"), Pair K ("Pair F's 'counts presence…' idiom", "like D and F–I"). Each already explains its idiom in place, so the F reference is dropped, not replaced.
- **Kept, per the census:** the roster in `SPEC/tasknote-selection.md` (pointer target), `park-mode.md`, `step-0-flags.md`, the `ft-file-followup` stub (the skill itself), `claude/CAPABILITIES.md` L34 and the three `docs/PLATFORMS.md` rows (Pair I's surfaces, [[CORE-734.6]]), and `docs/CODEX-VERIFICATION.md` L288 (dated record).
- **Best Practices Review.**
  - *Responsibility:* `park-mode.md` §"Step P2" owns the flag → section → `pickup:` mapping; `SPEC/tasknote-selection.md` owns the contract-layer statement. Every other surface names `--park` and points.
  - *Duplication:* five copies of the roster and a two-fence checker go away.
  - *Behavior:* `pair_j` reads only own-slug spans, so the `ft-epic-discovery` see-also never reached it. `pair_m`'s named case is unchanged; only its justification moves.
- **Archive skim.** `archive/core/` confirmed against the README table. Read [[CORE-734.3]] (Pair F verdict, the out-of-scope list, review note 1 adding the re-home) and [[CORE-734.4]] (stub shape, the preamble and CONVENTIONS edits). Pair F's minting history ([[CORE-433.2]], [[CORE-460.2]]) is summarized in its own entry, which was used.
- **Drift check.** The PLAN line matches the code: five roster mirrors, two carve-outs, one exemption. One extra surface the line does not name: the release-only pair lists in the preamble and CONVENTIONS L58 / L66 still list F; they are edited here, as [[CORE-734.4]] did for L. `ft-release/SKILL.md` L289 ("eleven pairs") counts CI pairs, unchanged by F, so it is left alone.
- **Downstream-impact scan.** Not triggered. [[CORE-734.6]] edits Pair I and PLATFORMS; Pair K's "like D and F–I" becomes "like D and I", which `.6` will touch again.
- **Clarifications (AskUserQuestion, 2026-10-07).** *Exemption re-home* → **keep the named case** in `pair_m`; both comments name `park-mode.md` §"Step P2" and `SPEC/tasknote-selection.md` as the owners (the four are `--park`'s arguments, not skill modes).
- **Assumptions.**
  - The snippet's peer-skills bullet already ends with a pointer to `SPEC/tasknote-selection.md` §"When to use a tasknote", the section holding the roster, so it drops the bracket and adds nothing. `AGENTS.md` (no such pointer on the roster) gets a short one.
  - Adopters see the snippet change only when they next re-paste; nothing is pushed to them.
  - No `.1` Fan-out names this child, so there is no YAML echo.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no check logic changed; `pair_m`'s case is untouched and the drift run below is the test.

**Implementation Notes:**

- *Pattern survey.* The retired stub follows Pair G and Pair L: what it guarded, why there is nothing left, "The letter is kept…". Each mirror keeps its own shape and swaps the roster for `--park` plus a pointer, the shape [[CORE-510]] gave the snippet's roster.
- *Mirrors.*
  - `docs/GLOSSARY.md` **sidequest**: "Priority via a flag or one short question" with a link to `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".
  - `docs/MIGRATION.md` `ft-sidequest` row: `/ft-file-followup --park [ID]`, with the same pointer in the "priority flags" clause.
  - `AGENTS.md` roster: `` (`--park`, `--starter`; flags: `SPEC/tasknote-selection.md`) ``.
  - `claude/AGENTS-snippet.md` roster: `` (`--park`, `--starter`) `` — the bullet already ends with the tasknote-selection pointer.
  - `claude/commands/ft-epic-discovery.md` see-also: `--park [TASK-ID]` plus "priority flags in `SPEC/tasknote-selection.md`".
- *KEEP IN SYNC item 1:* both comments now say names-only with no exception; `AGENTS.md`'s adds that flag detail sits behind the pointer.
- *Script:* `pair_j` names `--park`'s arguments and `park-mode.md` §"Step P2" in place of "Pair F's job", and calls the vacuous pass "the `continue` idiom". `pair_m`'s bullet re-homes the exemption to `park-mode.md` §"Step P2" + `SPEC/tasknote-selection.md`; the case line is unchanged.
- *Catalogue:* Pair F → retired stub. The preamble's release-only list drops F. Pair I's guard is "a `continue` idiom"; Pair J drops its Pair F clause; Pair K drops the "counts presence" idiom clause and reads "like D and I"; Pair M's `Check:` names the exemption's owner.
- *CONVENTIONS:* L58 and L66 release-only lists drop F.
- *Pair Q catch:* the first drift run failed `pair_q` on a bare `park-mode.md §"Step P2"` citation in the catalogue; it now uses the full `claude/skills/ft-file-followup/park-mode.md` path.
- *Minimal refactor gate.* Left alone: `SPEC/tasknote-selection.md`, `park-mode.md`, `step-0-flags.md`, the `ft-file-followup` stub (owners), `claude/CAPABILITIES.md` L34 and `docs/PLATFORMS.md` (Pair I, [[CORE-734.6]]), `docs/CODEX-VERIFICATION.md` L288 (dated record), `ft-release/SKILL.md` L289 (counts CI pairs, unchanged).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the drift script is the suite here; no viz or updater code changed

- [x] Ran lint/type-check on changed code — `bash -n` + `shellcheck` on `tools/drift-checks.sh`

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review blocker was fixed):

```text
grep -lE -e '--(low|fut)\b' <five mirrors>                          → 1 (none)
grep -c -e '--park' GLOSSARY/MIGRATION/AGENTS/snippet/ft-epic-discovery → 1/2/1/1/1
grep -q -e '--fut' tasknote-selection / park-mode / ft-file-followup stub → 0/0/0
grep -q '^\*\*Pair F — retired\.\*\*' mirror-pairs                    → 0
grep -c '^\*\*Pair [A-Z]' mirror-pairs                                 → 17
git grep -n 'Pair F' AGENTS.md claude/AGENTS-snippet.md                → 1 (none)
git grep 'Pair F' (live surfaces)                                      → the stub + drift-checks.sh L292 (history: "CORE-734.5 retired Pair F")
grep -q 'park-mode.md' tools/drift-checks.sh                           → 0
bash tools/drift-checks.sh                                             → 0 (16 ok; first pass failed pair_q on a bare park-mode.md § citation, fixed)
find claude/skills/ft-release -type f -exec cat {} + | wc -c            → 108,477 (< 110,142; −1,665)
bash -n tools/drift-checks.sh                                          → 0
shellcheck -f gcc tools/drift-checks.sh | wc -l                        → 13 (HEAD: 13; pre-existing)
```

Judgment: pointer placement read per surface. GLOSSARY, MIGRATION and the `ft-epic-discovery` stub carry the pointer in the same sentence or row; `AGENTS.md` inside the roster parens; the snippet's bullet already ends with the `.flaitron/core/SPEC/tasknote-selection.md` pointer.

External review: `/code-review medium` over the working-tree diff → **1 blocker**, 7 notes.

- **Blocker, fixed.** The Pair F stub said the roster now sits "only" in `SPEC/tasknote-selection.md` and the skill. It also sits in `step-0-flags.md`, CAPABILITIES L34, the three PLATFORMS rows, `pair_m`'s case and CODEX-VERIFICATION L288. The stub now lists every copy. Phase 3 re-ran from the top.
- **Notes:**
  1. Retiring F drops the only binding between `SPEC/tasknote-selection.md` and the skill's roster, and the stub glob → **recorded** on the stub as the census's accepted tradeoff; left for [[CORE-734.N]] to rule on with [[CORE-734.4]]'s catalogue-existence gap.
  2. `pair_m` hard-codes the four flags → **no change**: the operator chose to keep the named case (Discovery clarification).
  3. Pair K's CI list omitted R → fixed (touched line).
  4. Pair J's "the same roster" dangled once F's sentence went → fixed ("its park-priority roster").
  5. AGENTS.md KEEP IN SYNC item 1 restated item 2's pointer rule → fixed (item 1 is now "The roster is names-only."). The inline pointer in `AGENTS.md` vs the bullet-end pointer in the snippet is a shape difference the comment already allows ("slightly different prose").
  6. `AGENTS.md`'s pointer names no section → no change: always-loaded bytes; the module is the pointer target the comment's item 2 already names.
  7. The stub's bare `SPEC/` path does not resolve in adopters → no change: house convention across every `claude/commands/` stub.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep:**
- Updated: `AGENTS.md` (roster + KEEP IN SYNC item 1), `claude/AGENTS-snippet.md` (roster + item 1), `docs/GLOSSARY.md` (**sidequest**), `docs/MIGRATION.md` (`ft-sidequest` row), `docs/CONVENTIONS.md` (L58, L66 release-only lists).
- No change: `README.md`, `SPEC.md`, `SPEC/*.md` (`tasknote-selection.md` is the pointer target and keeps the roster), `docs/PLATFORMS.md` and `claude/CAPABILITIES.md` (Pair I's surfaces, [[CORE-734.6]]), `claude/skills/*/SKILL.md` (`ft-release` L289 counts CI pairs, unchanged), the other three `*/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/{AGENT-COMPAT,EXTERNAL-AGENTS,WORKTREES,VISION,PHILOSOPHY,DOGFOOD,UPGRADING,CONTEXT-BUDGET,AGENT-NEUTRALITY}.md`. None cites Pair F or restates the roster.
- Release-owned: `docs/VERSION-HISTORY.md`, `.flaitron/PLAN-ARCHIVE.md`.

**Recap.** The five roster mirrors now name `--park` and point at `SPEC/tasknote-selection.md`. Pair F is a retired stub listing every remaining roster copy. Both KEEP IN SYNC comments lose the park-flag carve-out. `pair_j`/`pair_m` name `park-mode.md` §"Step P2" as the owner of the exemption, and the named case is unchanged.

- **Changed:** `AGENTS.md`, `claude/AGENTS-snippet.md`, `claude/commands/ft-epic-discovery.md`, `docs/{GLOSSARY,MIGRATION,CONVENTIONS}.md`, `tools/drift-checks.sh` (comments only), `claude/skills/ft-release/step-7.1-mirror-pairs.md`, `.flaitron/PLAN.md`, and this note.
- **Verification:** the receipt above. All checks pass on the second pass, after one review blocker was fixed.
- **Refactors:** none.
- **`touches:` reconciliation:** `git diff --name-only` equals the declared set.
- **Maintainability:** one less release-only pair. `claude/skills/ft-release/**` dropped 110,142 → 108,477 bytes. The contract ↔ skill roster copy is unbound by design; this is recorded on the stub for `.N`.

**Learnings:** N/A. No new rule for the always-loaded layer.

**Archived:** 2026-10-07
