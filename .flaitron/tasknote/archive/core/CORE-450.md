---
title: proceed-reply-vocab
status: completed
tags: []
created: 2026-08-18
due:
related-tasks: [CORE-066, CORE-437, CORE-254.2]
touches:
  - SPEC/gates.md
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
---

# CORE-450 | proceed-reply-vocab

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-066]] [[CORE-437]] [[CORE-254.2]]

## 🎯 Goal

Name how operators approve gates: keep 📦 commit-go as a closed `commit` / `go` / `yes` set, and treat informal proceed replies as conversational assent on 🛠️ and 👁️ — without promoting `okay` / `looks good` into commit authorization.

## ✅ Acceptance

- [x] `SPEC/gates.md` names the closed commit-go set (`commit` / `go` / `yes`) and states that `okay` / `looks good` are not members
- [x] `SPEC/gates.md` names conversational assent as valid approval for 🛠️ and 👁️ (examples, not a closed list)
- [x] Destructive-action banners are explicitly out of the assent loosening (safety control)
- [x] Cite-once: skills that wait for 🛠️ "user's go" point at the gates.md clause instead of forking a third token list
- [x] One rationalization + one red flag cover the two failure modes (over-strict wait on 🛠️/👁️; 👁️ `looks good` treated as 📦)

## 🧩 Subtasks

- [x] Add `### Accepted gate replies` to `SPEC/gates.md` (closed set + conversational assent + destructive carve-out)
- [x] Point the 🟢 GO table Notes cell and `SPEC.md` post-closure prompt paragraph at that section
- [x] Add the matching rationalization + red-flag rows
- [x] Pointer-edit 🛠️ "wait for the user's go" sites (`ft-task`, `ft-epic-discovery`, `ft-close-epic`, `SPEC/procedures/ft-task.md`)
- [x] `/ft-micro-task` fire prompt stays the closed set; fire-branch wait cites §"Accepted gate replies". `/ft-new-project` example already matches; left as-is

## 🔗 Related

- [[CORE-066]] — minted the 🟢 emission example `Reply commit / go to land` (prompt text, not an accept-list)
- [[CORE-437]] — `/ft-micro-task` fire prompt lists `commit` / `go` / `yes`; SPEC.md emission example still omits `yes`
- [[CORE-254.2]] — cue-vocabulary table restates the emission example; 🟢 is commit-go, 👁️ is visual-confirm

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real: SPEC names an emission example (`commit` / `go`), skills already accept `yes`, and informal `okay` / `looks good` are used in the wild (especially 👁️) with no clause telling an agent to take them — or not to treat them as commit-go.

- [x] Read relevant source files — `SPEC/gates.md` (🟢 GO row, 👁️ CONFIRM, 🛠️ wait, Rationalizations "per-cue"), `SPEC.md` §"Post-closure protocol" + glossary 🟢/👁️, `claude/skills/ft-task/SKILL.md` Step 4/6, `ft-micro-task` fire prompt, `ft-epic-discovery` / `ft-close-epic` 🛠️ wait, `ft-new-project` commit-go example, `SPEC/procedures/ft-task.md`

- [x] **Best Practices Review** — `SPEC/gates.md` is the SSOT (CORE-437 cite-once). Skills enumerate tokens only as examples. No new cue, banner, or glyph. Bound: do not add a 🛠️ reply-prompt line (shape change, out of scope); do not loosen destructive-action approval (`--fast` does not suppress that banner).

- [x] **Archive skim** — [[CORE-066]] minted the emission example; [[CORE-174]] / [[CORE-254.2]] restated it; [[CORE-437]] put `yes` on the micro-task fire prompt without promoting it into SPEC; FE archives treat `looks good` as the 👁️ reply (FE-023, FE-007, CORE-098.11). No prior task named an accept-list.

- [x] **Drift check** — PLAN cites `SPEC/gates.md` and the set `commit`/`go`/`yes`. Heading and 🟢 row exist; SPEC.md still prints only `commit` / `go` in the emission example (not drift — that's prompt text). Cross-artifact: a two-layer rule does not contradict the two-banner cap, `--fast`, or "approval is per-cue, not ambient"; it *implements* the per-cue rule for replies. PLAN line is the decision this note lands; no rewrite.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Current surface (uneven):**

| Surface | What it prints / waits for |
|---|---|
| `SPEC/gates.md` 🟢 Notes | Emission: `Reply commit / go to land` — no accept-list |
| `SPEC.md` post-closure | Same emission example |
| `/ft-task` 📦 fire | Internal wait: `"commit"/"go"/"yes"` |
| `/ft-micro-task` 🟢 fire | Prompt: `Reply commit / go / yes` |
| `/ft-new-project` | Example: `"yes", "go", "commit"` |
| `/ft-release` | Emission: `Reply commit / go to land` |
| 🛠️ sites | `wait for the user's go` — no tokens, no assent clause |
| 👁️ | No tokens; archives show operator reply `looks good` |

The PLAN already treats `commit`/`go`/`yes` as the existing set. The live question is only whether `okay`/`looks good` join it, and whether informal replies stay implicit or get named.

**Decision (answers both PLAN questions):**

1. Informal proceed replies **stay conversational assent**, named as a *principle* (not a closed token list) for 🛠️ and 👁️. Sharper SPEC clause, not a validator — matches VISION.
2. `okay` / `looks good` **do not** join the closed commit-go set. `okay` is too weak to authorize a commit; `looks good` is already 👁️'s natural reply, and promoting it would let a visual confirmation bind as 📦 authorization (collides with "approval is per-cue, not ambient").
3. Codify the closed set as `commit` / `go` / `yes` in `SPEC/gates.md` to close the SPEC-vs-skill drift. Emission example stays `Reply commit / go to land.`; `yes` is accepted even when unprinted.
4. Destructive-action banners stay tight — `--fast` does not suppress them; `okay` / `looks good` must not authorize `DROP` / `rm -rf`.

**Assumptions:** no AskUserQuestion — the PLAN asked the agent to decide. No new cue/glyph. No 🛠️ banner shape change. Cite-once in gates.md; skills get a pointer on 🛠️ wait-lines only. `/ft-new-project`'s example already matches the closed set (order differs; leave it). Downstream PLAN scan: only CORE-450 is open; no reconcile.

---

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Same cite-once shape as CORE-437 / CORE-444: `SPEC/gates.md` owns the rule; `SPEC.md` core points; skills and the procedure SOP carry a pointer, not a forked list. No new cue, glyph, or banner. 🛠️ banner shape left unchanged (no new reply-prompt line).

**Minimal refactor gate.** No refactor. Deferred: `/ft-new-project` example order (`"yes", "go", "commit"`) already names the closed set — not worth a churn edit.

**Landed:**
- `SPEC/gates.md` — new `### Accepted gate replies` (closed commit-go set; conversational assent on 🛠️/👁️; destructive-action out); 🟢/👁️ Notes pointers; two rationalization rows; two red flags; Rationalizations scope line widened to accepted-reply matching
- `SPEC.md` — post-closure commit-go paragraph names the closed set and excludes `okay` / `looks good`
- Pointers: `ft-task` (🛠️ wait + 📦 fire), `ft-epic-discovery` / `ft-close-epic` (🛠️ wait), `ft-micro-task` (🟢 fire wait), `SPEC/procedures/ft-task.md` (🛠️ wait + 📦 fire)

**Tests.** N/A — markdown contract; no executable surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- Targeted tests: N/A (no executable / viz / updater change)
- Lint/typecheck: N/A (markdown only)
- Quality: new section is one cite-once clause; skill edits are pointers, not restated lists; 👁️ `looks good` ≠ 📦 is a new rationalization, complementary to the existing per-cue ambient-approval row. Heading `### Accepted gate replies` sits as a sibling of `### Inline asks` / `### Landmark cues`. All six skill/SOP pointers resolve to that heading.
- Frontend 👁️: N/A (no UI)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `SPEC.md` — updated (post-closure closed-set sentence)
  - no change: `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Informal proceed replies stay conversational assent on 🛠️ and 👁️; they do not join the closed 📦 set. `SPEC/gates.md` now names `commit` / `go` / `yes` as commit-go and tells agents not to wait for those tokens on a plan/UI ask — and not to treat a 👁️ `looks good` as commit authorization.

**Archived:** 2026-08-18
