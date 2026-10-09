---
title: global-layer-alignment discovery
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-770, CORE-EPIC-769]
touches:
  - .flaitron/PLAN.md
---

# CORE-770.1 | global-layer-alignment discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-770]]

## 🎯 Goal

Scope the `CORE-EPIC-770` epic (`global-layer-alignment`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-770.2..4` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-770.2 .. CORE-770.4 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-770.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (global CLAUDE.md, `~/Code/AGENTS.md`, memory, natabula skills/docs/hook, flaitron contract touch points) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-770.2 .. CORE-770.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-770 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-770]] — parent epic
- [[CORE-EPIC-769]] — skill-surface epic whose v7.0.0 renames and command retirement this alignment checks the global layer against

## 🌳 Fan-out

- **Parallel:** [[CORE-770.2]], [[CORE-770.3]], [[CORE-770.4]] (disjoint files, different owners)
- **Synthesis:** [[CORE-770.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The operator asked to check, before v7.0.0, that flaitron does not conflict with the global rules and skills. CORE-EPIC-769 just changed the skill surface: four renames and the retired `claude/commands/`. The global layer was never swept against it.

- [x] Read relevant source files — read:
  - `~/.claude/CLAUDE.md` and `~/Code/AGENTS.md` (both in session context)
  - all 7 flaitron-project memory files
  - natabula skills, docs, and PLAN, via grep under the `~/Code` exception
  - flaitron's references to the global layer

  `~/.claude/settings.json` and `~/.claude/skills/` were approved by the operator but blocked by the NAT-195 hook (no root in `path-access-roots`), so they were not read.

- [x] **Best Practices Review** — boundary: natabula `docs/CLAUDE-LAYERING.md` assigns ownership.
  - Layers 1–2 (`~/.claude/CLAUDE.md`, `~/Code/AGENTS.md`) are hand-authored by the operator, and natabula and flaitron do not edit them. The one exception is natabula's Path Access hook pair (NAT-195).
  - Layer 3 is natabula; layer 4 is flaitron.
  - Fixes therefore route by owner: flaitron PLAN rows for flaitron, natabula PLAN rows for natabula (SPEC §"Cross-repo edit remit"), an operator-applied diff for layers 1–2, and direct agent edits for the agent-owned memory.

- [x] **Archive skim** — `archive/core/` checked against the README table. CORE-769.1 Probe D and the CORE-769.3–.7 notes are the relevant precedent: the rename map, the NAT-391 hand-off, and the repeated Path Access block on relinking. No earlier tasknote audits the global layer.

- [x] **Drift check** — flaitron's live files never cite `~/.claude/CLAUDE.md` or the global layer, so the contract does not depend on it. The direction of drift is global → flaitron. `~/Code` is not a git repo, so `~/Code/AGENTS.md` has no PLAN or commit trail. natabula is pinned at **v6.0.0**, one release behind v6.1.0.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 4 asks via AskUserQuestion; see Resolved scoping

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**A — Global standards vs. the flaitron contract.** Layer 1 is `~/.claude/CLAUDE.md`; layer 2 is `~/Code/AGENTS.md`.

1. **Ask-first vs. flaitron's gates.** Layer 1 says: "For any non-trivial new task, start with … Ask me questions using AskUserQuestion before planning or coding. Then wait."
   - Flaitron does not always ask first: `/ft-task`'s Phase 1→2 gate is `default-skip`, and the closure commit is autonomous when the skip signals clear. `--fast` suppresses conditional gates, and `--unattended` runs with no operator at all.
   - Layer 1's own precedence line ("project … AGENTS.md take precedence where they conflict") resolves this inside adopters. The literal ask-first rule still reads as mandatory, though, and it competes with any flaitron skill invocation.
2. **Commit authorization.** The harness default is "commit only when the user asks". Flaitron's skip-branch autonomous commit relies on skill invocation as the authorization, and neither layer 1 nor layer 2 says so. Push stays gated in both, so they agree there.
3. **Model selection.** Layer 1 names only `[heavy]🧠` and `[light]🔧`. Flaitron's ladder is `[light]` / `[medium]🧩` / `[heavy]` / `[frontier]💎` / `[xheavy]🔭` (SPEC/model.md).
4. **New-repo pointer.** Layer 1 points at `SPEC.md` and `docs/MIGRATION.md`. It names neither `/ft-adopt` (v7) nor natabula's `/natabula-adopt` front door.
5. **No conflict found** in the remaining rules:
   - screenshots (`👁️ CONFIRM` matches SPEC Phase 3)
   - one task per conversation (matches one tasknote per window)
   - surgical changes
   - layer 2's commit-to-main rule with the `wt-<ID>` carve-out (matches `docs/WORKTREES.md`)
   - no operator email in outbound requests

**B — Memory (agent-owned, flaitron-project scope).** Six of the seven files are stale against v7.
- `feedback_post_closure_suggest_next`: prescribes `/clear then /model … then /task <ID>`. `SPEC/post-closure.md` step 3 now forbids literal `/clear` / `/model`, and `/task` is now `/ft-task`. The rule itself is still valid, and this session broke it: no next move was suggested after "push".
- `feedback_no_premature_slash_commands`: names `/ft-starter-task` (retired), `/ft-epic-discovery` and `/ft-file-followup` (renamed), and a `✋ File in this session` cue. SPEC now uses `👇 Run in this session:`, and the exception lives in `post-closure.md` step 3, not in `/ft-close-epic`.
- `feedback_no_scratchpad_files`: says `/ft-audit-context` (now `/ft-audit context`) and `_project/PLAN.md` (now `.flaitron/PLAN.md`).
- `feedback_playwright_artifact_paths`: says `.flowtron/screenshots/` and "flowtron `SPEC.md`".
- `project_obsidian_positioning`, `feedback_no_cd_before_git`, `feedback_no_bulk_adopter_push`: use the "flowtron" name. Their substance holds.
- The MEMORY.md index also says "flowtron".

**C — natabula (layer 3; cross-repo remit, so findings are filed as natabula rows).**
- NAT-391, filed by CORE-769.7, covers the four renames only.
- **Not covered: the retired command stubs.**
  - `natabula-init`'s precondition requires `.claude/commands/ft-task.md`. `/ft-adopt` in v7 no longer creates it, so `/natabula-init` stops on every v7-adopted repo, which is a hard break.
  - `natabula-adopt`'s not-adopted detector and `docs/CLAUDE-LAYERING.md` (§Symlink paths and adoption step 2) also describe `.claude/commands/ft-*.md`.
- **NAT-195 hook false positives** (`scripts/guard-path-access.sh`):
  - A relative `ln -s ../../claude/skills/<x>` target is read as a `..` climb from cwd, but symlink targets resolve from the link's directory. It blocked flaitron-self's relink in `.3`–`.6` and in this session. It will also block an agent running `/ft-update` Step 4 wiring in any adopter, the v7 swap included. The node fleet updater is not affected.
  - A grep regex containing a literal `~/.claude` string was read as a path, and so was a `sed -n '/CORE-EPIC-770/p'` address, during this note's own Phase 2. `.4`'s row names the `ln -s` case; these two ride along as evidence.
- natabula's own pin (v6.0.0) needs the v7 bump. NAT-391 says to land it with that bump.

**D — Not inspected.** `~/.claude/skills/` (which global links exist: `ft-adopt`/`ft-new-project`, `ft-audit-repo`, possibly retired slugs) and `~/.claude/settings.json`, both hook-blocked. The operator can list the first with `! ls -la ~/.claude/skills/`.

**Resolved scoping (AskUserQuestion, 2026-10-09).**

| Question | Decision | Consequence |
|---|---|---|
| Children | 3, split by owner | `.2` memory (agent) · `.3` layer-1/2 diff (operator-applied or per-path approval) · `.4` natabula rows (cross-repo remit) |
| Ask-first conflict | Carve-out in `~/.claude/CLAUDE.md` | When a flaitron skill drives the task, its gates decide when to ask; ask-first governs work outside a skill |
| Commit authorization | Add to `~/Code/AGENTS.md` | Invoking a flaitron skill authorizes its closure commit; push always needs an explicit ask |
| v7.0.0 release | Not blocked | Release once flaitron-self's local links are fixed; natabula's v7 bump waits on `.4`'s rows |

**Drafted children** (description word counts, `wc -w`): `.2` memory-refresh 35w · `.3` global-standards-diff 49w · `.4` natabula-v7-handoff 39w. All three touch disjoint files with different owners, so they are Parallel; `.N` is Synthesis.

**Flaitron-side impact.** None found: flaitron's contract makes no claim about the global layer, and every conflict above is fixed in its owner's layer. On that evidence the epic does **not** block the v7.0.0 tag. Natabula's v7 bump, however, waits on C.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-769.1 shape: children 2-space nested before `.N`, `[model]` + glyph, `| shortname`, and a `## 🌳 Fan-out` insert on `.1`

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: PLAN filing only

**Implementation Notes:**

- Wrote 3 child lines (35/49/39 words), verbatim as approved at 🛠️, between `.1` and `.N`. M stays 3, as estimated at filing.
- Refined the parent description to 40 words. It drops "Before v7.0.0" and now says the epic does not block the release, per Resolved scoping.
- **Downstream impact:** none. The only other open row is CORE-641 (typescript-7, parked), which these children do not touch.
- **`[unattended]` candidacy:**
  - `.2` was admitted (`[light]`, no keyword, Parallel predecessor `.1` closes now), but the operator declined it.
  - `.3` fails clause 3 ("operator"), `.4` fails it ("cross-repo"), and `.N` fails clause 1 (`[heavy]`).
- **Model departures:** `.2` `[light]`, `.3` `[medium]`, `.4` `[light]` against the epic's `[heavy]` seed, shown and approved at 🛠️ and again at the candidacy review.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — `N/A` for code. Markdown pass: 2-space indent, bold IDs, `[model]` + glyph, `| shortname` ≤30 chars, em-dash separators, no trailing whitespace, Fan-out wikilinks match the filed children. `bash tools/drift-checks.sh` result in Testing Notes.

- [x] **External review** — `N/A`: the deliverable is PLAN rows the operator approved verbatim at 🛠️ (CORE-769.1 precedent)

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -cE ' +$' .flaitron/PLAN.md   → 0
bash tools/drift-checks.sh         → 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change for every entry (README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md). This is pure Discovery filing, and every fix lands outside flaitron's docs.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. flaitron's contract deliberately says nothing about the operator's global layer, and this Discovery confirms that is the right boundary.

**Final Summary:**

The global-layer alignment epic is scoped. Flaitron v7 conflicts with nothing in the operator's global layer. The global layer is what drifted, so three children fix it, one per owner:
- `.2` memory refresh (agent)
- `.3` a drafted diff for `~/.claude/CLAUDE.md` and `~/Code/AGENTS.md`: an ask-first carve-out, commit authorization, the model ladder, and the new-repo pointer
- `.4` natabula rows: `natabula-init` breaks on v7 adopters over the retired command stub, and the NAT-195 hook gives false positives on relative symlinks

The v7.0.0 release is not blocked.

- **Changed files:** `.flaitron/PLAN.md` (3 child rows, parent refinement, `.1` stub) and this note.
- **Verification:** drift checks → 0; markdown pass clean.
- **Refactors:** none.
- **Docs verdict:** no change.
- **`touches:` reconciliation:** declared 1 file, changed 1 (`.flaitron/PLAN.md`), excluding this note.
- **Maintainability:** each child stays inside one owner's layer, so nothing edits across a boundary it doesn't own.
- **Not inspected:** `~/.claude/skills/` and `~/.claude/settings.json` (hook-blocked); `.3` covers the first through an operator `ls`.

**Archived:** 2026-10-09
