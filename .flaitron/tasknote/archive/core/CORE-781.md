---
title: auto-priority
status: completed
tags: [filing, park]
created: 2026-10-12
due:
related-tasks: []
touches:
  - claude/skills/ft-file-task/park-mode.md
  - claude/skills/ft-file-task/SKILL.md
  - claude/skills/ft-open-epic/SKILL.md
  - SPEC/tasknote-selection.md
  - SPEC/plan-filing.md
  - docs/GLOSSARY.md
  - claude/CAPABILITIES.md
---

# CORE-781 | auto-priority

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Filing skills stop asking the operator for priority: `/ft-file-task --park` (no flag), `/ft-file-task`, and `/ft-open-epic` file at the AI's best-read priority, with the park priority flags still overriding.

## ✅ Acceptance

- [x] park-mode.md Step P2 no longer asks; no-flag path picks from context hints and writes without waiting — `! grep -n 'one short question\|Do not write files until' claude/skills/ft-file-task/park-mode.md`
- [x] SPEC/tasknote-selection.md drops "never auto-file" / the `Low · Medium · Future?` question — `! grep -n 'never auto-file\|Low · Medium · Future' SPEC/tasknote-selection.md`
- [x] `/ft-file-task` and `/ft-open-epic` Step 2 no longer collect priority via AskUserQuestion; the chosen section is shown at the existing review/confirm surface for override — `grep -n 'Priority' claude/skills/ft-file-task/SKILL.md claude/skills/ft-open-epic/SKILL.md` (judgment on wording)
- [x] Restating surfaces swept (plan-filing.md, GLOSSARY, CAPABILITIES; codex wrappers are pointer-only) — `! grep -rn 'priority question\|one short prose question\|one short question when omitted' SPEC docs claude codex`
- [x] Drift checks still pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] park-mode.md: rewrite Step P2 no-flag path to auto-pick; fix P3 item 6 + context-hints note, P4 item 1 and item 5 authorization wording
- [x] SPEC/tasknote-selection.md: priority-flags paragraph
- [x] ft-file-task SKILL.md Step 2 item 2 + Step 3 review bullet shows the section
- [x] ft-open-epic SKILL.md intro line, Step 2 item 3, Step 3 surface shows priority
- [x] SPEC/plan-filing.md lines ~65 and ~182; docs/GLOSSARY.md sidequest; claude/CAPABILITIES.md `--park` row
- [x] Run drift checks + Acceptance greps

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three priority prompts exist at HEAD (park-mode.md:48-56, ft-file-task SKILL.md Step 2 item 2, ft-open-epic SKILL.md Step 2 item 3); the operator filed this to remove them.

- [x] Read relevant source files — park-mode.md (whole), ft-file-task SKILL.md Steps 2–3, ft-open-epic SKILL.md Steps 1–4, SPEC/tasknote-selection.md park section, SPEC/plan-filing.md §"Filing commits"

- [x] **Best Practices Review** — N/A: prose contract edits, no code or module boundaries.

- [x] **Archive skim** — grepped `archive/core/` (Area confirmed `CORE-*` → `archive/core/` in README table) for `park-mode.md` / `never auto-file` / priority-question phrasing: ~20 hits, all mechanical (flag-roster syncs, Pair F, commit-placement CORE-429). No recorded rationale for the "never auto-file" rule to preserve. Pair F is retired; `tools/drift-checks.sh:376` only exempts the four flag names, which stay.

- [x] **Drift check** — PLAN line matches HEAD: cited `park-mode.md Step P2` and `SPEC/tasknote-selection.md "never auto-file"` both present verbatim. "Sweep codex mirrors": `codex/skills/ft-file-task|ft-open-epic/SKILL.md` are pointer-only wrappers into the claude bodies and name no priority prompt — nothing to edit there; the real restating surfaces are plan-filing.md, GLOSSARY, CAPABILITIES.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) "explicit flags still override" means the existing park flags; no new priority flags are added to default `/ft-file-task` or `/ft-open-epic` — the operator overrides there at the existing review / ID-confirm surface, which now names the chosen section. (2) Park auto-pick uses the existing context hints (quick fix → Low, same feature/epic → Medium, tangential → Future); High only with explicit urgency in context. (3) The Step P5 reply already names the priority and P5's correction paragraph already handles a chat correction — kept as the override path. (4) `/ft-file-task` Step 2 keeps priority in its five-field list (unattended drafts all five) but marks it AI-decided, not asked.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Codex/cursor/grok mirrors: zero priority-prompt text (grep). `docs/CODEX-VERIFICATION.md:288` lists the park flags only — historical verification record, flags unchanged, no edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing filing-field prose and park Step P2 shape; no new structure

- [x] **Minimal refactor gate** — no refactor; only the priority-prompt wording and its restatements

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract; no test binds the question text

**Implementation Notes:**

- park-mode.md Step P2: the no-flag path now auto-picks (first-match hints, High only on explicit urgency) and continues in the same turn; the hints paragraph in P3 was folded into P2; the P4 pre-check and commit-authorization wording no longer reference the question; the P5 correction also updates the stub's `priority:`/`pickup:`.
- ft-file-task / ft-open-epic Step 2: priority marked AI-decided and left out of AskUserQuestion; Step 3's review (file-task) and the ID surface (open-epic) name the section and accept an override.
- Sweep: SPEC/tasknote-selection.md, SPEC/plan-filing.md (×2), GLOSSARY, CAPABILITIES. Codex wrappers are pointer-only, so no edit was needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` 19 pass / 0 fail

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (markdown-only diff)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (post-review-fix run):
- A1 `grep -n 'one short question\|Do not write files until' park-mode.md` → 1 (no match = pass)
- A2 `grep -n 'never auto-file\|Low · Medium · Future' SPEC/tasknote-selection.md` → 1 (pass)
- A3 `grep -n 'AI-decided' ft-file-task/SKILL.md ft-open-epic/SKILL.md` → 0 (3 hits); wording judged acceptable
- A4 `grep -rn 'priority question\|one short prose question\|one short question when omitted' SPEC docs claude codex` → 1 (pass)
- A5 `bash tools/drift-checks.sh` → 0 (all 17 checks ok); `node --test tools/drift-checks.test.mjs` → 0 (19/0)

External review (`/code-review medium`, working-tree diff), 9 findings, all **notes**, no blockers:
1. P5 correction left the stub YAML stale → fixed (correction also updates `priority:`/`pickup:`).
2. open-epic Step 3 override text covered only the suffix → fixed (priority override sets the Step 4 heading).
3. `[!critical]` was tied to `--high` → fixed (any High with explicit urgency).
4. file-task Step 2 preamble said "confirm the key fields" → fixed ("every field below except Priority").
5. open-epic Step 2 preamble said "gather all inputs" → fixed ("all but Priority").
6. Hint overlap (quick fix vs same epic) → fixed ("first match wins").
7. `/ft-refactor` still proposes priority → no change: it is already AI-proposed and confirmed in its existing plan review (Step 4), with no separate ask, which is the target behavior.
8. plan-filing authorization for a no-flag park → no change: the priority is named in the P5 reply and corrected per P5, which is the accepted trade-off of this task.
9. sidequest-template default `priority: Low` → no change: P3 item 6 already overwrites the YAML from the P2 read.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — grepped every §"AI-referenced docs" entry for park-priority ask wording: `claude/CAPABILITIES.md` updated (`--park` row); README / AGENTS.md / SPEC.md / MIGRATION / the four snippets / CONVENTIONS / CONTRIBUTING / SECURITY / AGENT-NEUTRALITY / PLATFORMS / AGENT-COMPAT / EXTERNAL-AGENTS / WORKTREES / VISION: no change (flags only, no question text)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Removed the operator priority prompt from all three filing paths. A no-flag `/ft-file-task --park` now files at the AI's best-read section (first-match hints) and names it in the ≤70w reply for correction. `/ft-file-task` and `/ft-open-epic` drop Priority from their AskUserQuestion call and show the chosen section at their existing review / confirm surface. Park priority flags still override. Changed: park-mode.md, ft-file-task/SKILL.md, ft-open-epic/SKILL.md, SPEC/tasknote-selection.md, SPEC/plan-filing.md, docs/GLOSSARY.md, claude/CAPABILITIES.md. Verification: drift checks 17/17, self-test 19/0, four Acceptance greps clean. `touches:` reconciliation: `git diff --name-only` = the 7 declared paths exactly. Maintainability: net −9 lines; one fewer turn on the lightest filing path.

**Archived:** 2026-10-12
