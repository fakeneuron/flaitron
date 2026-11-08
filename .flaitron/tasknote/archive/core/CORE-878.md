---
title: grok-codex-wiring-wording
status: completed
tags: []
created: 2026-11-07
due:
related-tasks: []
touches:
  - docs/PLATFORMS.md
  - docs/AGENT-COMPAT.md
  - docs/AGENT-NEUTRALITY.md
---

# CORE-878 | grok-codex-wiring-wording

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Make the platform docs say what a Grok session in a Codex-wired repo actually runs (the `codex/skills/` wrappers, not the canonical bodies), and bring `docs/AGENT-NEUTRALITY.md` current with the installer-first README and the platform-doc scope.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md` Grok rows (`Today's surface`, `Installed-surface policy`, `Skill invocation`, `Skill-body flags`) no longer claim Grok in a Codex-wired repo runs the canonical `claude/skills/` bodies — `! grep -qE 'reuse the canonical .claude/skills/. bodies already wired for Claude, Codex, or Cursor|Each flag and its lazy fragments live in the canonical body Grok loaded|from the same canonical .claude/skills/. bodies Claude Code uses — no Grok-specific' docs/PLATFORMS.md`
- [x] Each of those rows says the `.agents/skills/` case loads the `codex/skills/` wrappers — `for n in 38 77 554 555; do sed -n ${n}p docs/PLATFORMS.md | grep -c 'codex/skills/'; done` prints 1 four times
- [x] `docs/AGENT-COMPAT.md` Grok row and the "Skill / command primitive" cell say the same, and the stale "detail is filed" pointer names the real stubs — `! grep -qE 'Adopters reuse canonical .claude/skills/. bodies \(stop if|they reuse canonical .claude/skills/. bodies via|is filed with the non-Claude trigger reference' docs/AGENT-COMPAT.md` and `grep -q 'codex/skills/' docs/AGENT-COMPAT.md`
- [x] `docs/AGENT-NEUTRALITY.md` README-Quickstart row describes the installer-first Quickstart (`install.sh`, manual fallback) — `grep -q 'install.sh' docs/AGENT-NEUTRALITY.md` and `! grep -q '`~/.claude/skills/` install path' docs/AGENT-NEUTRALITY.md`
- [x] `docs/AGENT-NEUTRALITY.md` §"Principle" exempts `PLATFORMS.md`, `AGENT-COMPAT.md` and `CODEX-VERIFICATION.md` — `awk '/^## Principle/{p=1;next} /^## /{p=0} p' docs/AGENT-NEUTRALITY.md | grep -c 'PLATFORMS\|AGENT-COMPAT\|CODEX-VERIFICATION'` prints 3 or more
- [x] Repo drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Reword PLATFORMS.md Today's surface Grok row, Installed-surface Grok row, and the Skill invocation and Skill-body flags rows
- [x] Reword AGENT-COMPAT.md Grok row, "Skill / command primitive" cell, and the "detail is filed" pointer
- [x] Rewrite the AGENT-NEUTRALITY.md README-Quickstart row
- [x] Add the §"Principle" exemption for the three platform docs
- [x] Run the verify commands and the repo validation set

## 🔗 Related

- [[CORE-383]] — introduced the README-Quickstart ledger row now being rewritten
- [[CORE-154.2]] — origin of the neutrality ledger

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Docs-only rewording, wording still wrong at every cited site (verified below), no code or contract change.

- [x] Read relevant source files — read the cited lines of the three docs, `README.md` §"Quickstart", `install.sh` agent detection, `codex/skills/ft-task/SKILL.md`, `codex/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`.

- [x] **Best Practices Review** — N/A: markdown only, no code or module boundary in scope.

- [x] **Archive skim** — `<area>` is `core` per the README table. Grepped `archive/core/` for the three doc paths; the hits are the tasks that built the Grok/Codex rows (CORE-257, CORE-271.4, CORE-456.3, CORE-677.x) and the earlier ledger edits (CORE-646, CORE-703, CORE-709, CORE-710). None records a decision that Grok runs canonical bodies in a Codex-wired repo; they assert the thin-bundle shape, which this task keeps.

- [x] **Drift check** — PLAN line cites `PLATFORMS.md` :38, :77, :555 and `AGENT-COMPAT.md` :37, :65-67, :69-70. All still hold, with one shift: `PLATFORMS.md` :555 is the Skill-body flags row, and the Skill invocation row at :554 makes the same canonical-body claim ("from the same canonical `claude/skills/` bodies Claude Code uses"), so it is fixed with it. `AGENT-COMPAT.md` :50 ("Reading the cells") repeats the claim for Cursor and Grok and is fixed with :65-67. Confirmed against `codex/AGENTS-snippet.md`: `.agents/skills/<n>` links to `codex/skills/<n>`, and `install.sh` wires `.agents/skills` for Codex, so a Grok session in a repo with only `.agents/skills/` runs the wrappers. `ft-task`'s wrapper reads the SOP first and the canonical body only for uncovered edges. Where `.claude/skills/` or `.cursor/skills/` is wired, the canonical bodies are correct. README Quickstart is installer-first (`install.sh`, manual fallback, Codex `$ft-adopt`), so the ledger row naming `~/.claude/skills/` as the install path is stale. PLAN line matches the task as filed; no SPEC contract is touched.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--unattended). Assumptions: the Grok-only `.grok/skills/` block keeps the canonical bodies (correct per `grok/AGENTS-snippet.md`); `grok/` and `codex/` files are out of scope; the exemption is one short paragraph in §"Principle", not new ledger rows.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** Size estimate: ~25 lines (rename-aware). Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing table-cell prose in place; no new shape.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: docs only.

**Implementation Notes:** Edited in place, no new shape. `docs/PLATFORMS.md` :38, :77, :298, :554, :555 and `docs/AGENT-COMPAT.md` Grok row, "Reading the cells" and the "Skill / command primitive" cell now say Grok runs the canonical bodies under `.claude/skills/` / `.cursor/skills/` / `.grok/skills/`, and the `codex/skills/` wrappers under `.agents/skills/` in a Codex-wired repo. The stale "detail is filed" pointer now names the Gemini CLI / Aider / Amp stubs in PLATFORMS §"Non-Claude capability triggers". The AGENT-NEUTRALITY README-Quickstart row describes the installer-first Quickstart, and §"Principle" gains one exemption paragraph for the three platform-coverage docs. :298 was added after the external review found the same claim there.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: docs only; the full validation set ran instead (`just check`, per `--unattended`).

- [x] Ran lint/type-check on changed code — `just check` covers lint and typecheck (receipt below).

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — `/code-review medium` over this task's diff graded it against Acceptance; findings recorded below (no blocker; notes fixed, filed, or recorded)

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface; docs only.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrails (Phase 3 entry): changed paths are the three declared docs plus this note; `git diff -M --numstat HEAD` totals 25 added / 12 deleted lines, under the 400 cap.

```text
A1 ! grep -qE <old Grok phrasings> docs/PLATFORMS.md                    → 0
A2 for n in 38 77 554 555; do sed -n ${n}p docs/PLATFORMS.md | grep -c 'codex/skills/'; done → 1 1 1 1
A3 ! grep -qE <old AGENT-COMPAT phrasings> docs/AGENT-COMPAT.md        → 0
A3 grep -q 'codex/skills/' docs/AGENT-COMPAT.md                         → 0
A4 grep -q 'install.sh' docs/AGENT-NEUTRALITY.md                        → 0
A4 ! grep -q '`~/.claude/skills/` install path' docs/AGENT-NEUTRALITY.md → 0
A5 awk §"Principle" | grep -c 'PLATFORMS|AGENT-COMPAT|CODEX-VERIFICATION' → 4
just check (viz test/typecheck/lint/build, tools tests, drift-checks)    → 0
```

External review (`/code-review medium`), five notes, no blocker:

- PLATFORMS :555 said the wrapper "points at" the canonical body; the `ft-task` wrapper enters the SOP first. Fixed: now says it routes `ft-task` through the SOP and falls back to the body.
- PLATFORMS :298 (plug-in table) kept the old claim. Fixed.
- PLATFORMS :388 and `grok/AGENTS-snippet.md` :20-30: :388 only describes the Grok-only `.grok/skills/` block, which is correct, so no change. The snippet and the Cursor Skill invocation row (:610) share the claim; both are outside `touches:` and filed as CORE-889.
- AGENT-COMPAT Grok row keeps its `Last verified` stamp although the wrapper claim follows from what `.agents/skills/` links to (`codex/AGENTS-snippet.md`, `install.sh`), not from a dated Grok run. Recorded, not changed: the stamp convention covers the row's dogfood, and no new observation was made.
- The §"Principle" exemption is blanket by design (the task asks for it); `bash tools/drift-checks.sh` stays green, and ledger rows for those files are not removed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — AI-referenced docs list: `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md` are this task's edits. `grok/AGENTS-snippet.md` and PLATFORMS' Cursor row carry the same drift but sit outside `touches:`; filed as CORE-889 (1ec5e878), not edited. Every other listed doc: no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-07.` stub at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — N/A.

**Final Summary:** Platform docs now say Grok in a Codex-wired repo runs the `codex/skills/` wrappers, not the canonical bodies. The "detail is filed" pointer names the real stubs, the neutrality ledger's README-Quickstart row matches the installer-first README, and §"Principle" exempts the three platform-coverage docs. Changed: `docs/PLATFORMS.md` (5 lines), `docs/AGENT-COMPAT.md` (+11/-6), `docs/AGENT-NEUTRALITY.md` (+9/-1). Verification: all Acceptance commands exit 0, `just check` → 0, external review found no blocker. Refactors: none. Doc verdict: see sweep. Scope reconciliation: Declared 3 files, changed 3. Undeclared: none. Maintainability: one wording per claim instead of three divergent ones. Follow-up filed: CORE-889 (Cursor row and Grok snippet).
unattended-candidates: CORE-889

**Archived:** 2026-11-07
