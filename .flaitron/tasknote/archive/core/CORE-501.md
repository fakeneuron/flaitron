---
title: stamp-write-ownership-gap
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-500, CORE-406]
---

# CORE-501 | stamp-write-ownership-gap

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-500]] [[CORE-406]]

## 🎯 Goal

Close the gap in `/ft-release` §5's stamp-write-ownership rule where a parallel dogfooding session writes stamp locations directly instead of reporting back, and where reported rationale can arrive already wrong.

## ✅ Acceptance

- [ ] `claude/skills/ft-release/SKILL.md` §5 step 3 runs a `git status --porcelain` dirty check on the three stamp files (`docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`) immediately before applying writes, and STOPs for operator reconciliation if they're already dirty from a source other than this session's own earlier edit in the same walk
- [ ] `docs/AGENT-COMPAT.md` §"Reading the cells" stamp-write-ownership paragraph names the new mechanical backstop, keeping the two docs in parity (CORE-406 precedent: both got matching edits)
- [ ] Doc-drift sweep clean

## 🧩 Subtasks

- [ ] Add the pre-write dirty check to `claude/skills/ft-release/SKILL.md` §5 step 3
- [ ] Add a matching backstop sentence to `docs/AGENT-COMPAT.md`'s stamp-write-ownership paragraph
- [ ] Markdown lint mental-pass on both edited files
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-500]] — release v5.22.0; hit a parallel dogfooding session that wrote all eight stamp locations mid-cut instead of reporting back
- [[CORE-406]] — parallel-dogfood-stamp-ownership; established the report-back rule this task found a gap in

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line is well-specified down to the exact rule and the exact incident (CORE-500). Confirmed the cited rule still exists verbatim at `claude/skills/ft-release/SKILL.md:180` and the mirrored `docs/AGENT-COMPAT.md:97-107`; no re-scope needed.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md:172-182` (dogfood-gate walk + stamp-write-ownership paragraph), `docs/AGENT-COMPAT.md:83-107` (Update obligation + stamp-write-ownership paragraph), `docs/DOGFOOD.md:120-154` (standalone dogfood procedure's own `git status --porcelain` self-verify step, Phase 3 + Recording the result)

- [x] **Best Practices Review** — `N/A`, doc-only change (no code, no module boundary). The addition extends an existing prose pattern (a numbered walk step) with one more mechanical sub-check, matching the shape of `git status --porcelain` checks already used elsewhere in this repo (`ft-task`'s foreign-dirt gate; `docs/DOGFOOD.md`'s own Phase 3 verify step).

- [x] **Archive skim** — `.flowtron/tasknote/archive/CORE/` grep for `ft-release/SKILL` / `AGENT-COMPAT.md` / `stamp-write` matched CORE-406 (the origin of the rule this task hardens) and CORE-500 (the incident that reopened it). Read both in full (see Discovery Notes below). No other archived tasknote materially touches this rule.

- [x] **Drift check** — the rule cited in the PLAN.md line matches current code exactly: `claude/skills/ft-release/SKILL.md:180`'s "Stamp-write ownership under parallel dogfooding" paragraph and `docs/AGENT-COMPAT.md:97-107`'s mirrored paragraph are both still the CORE-406 text, unmodified since. No SPEC contract addresses this case (SPEC.md is silent on dogfood-stamp mechanics; the rule lives entirely in the two docs above). No drift.

- [x] Asked clarifying questions — used `AskUserQuestion` on the exact fork the PLAN.md line names ("decide between a check and harder wording"): user chose **add a pre-write dirty check**, not a wording-only fix, and not both.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Root cause.** CORE-406 (v5.15.0 cut) added the "Stamp-write ownership under parallel dogfooding" rule after a parallel Grok session's interim write raced the release-driving session's own resolution. The fix was prose-only: a parallel session is instructed to report its verdict conversationally instead of editing the three stamp files itself. CORE-500 (v5.22.0 cut) shows this prose alone is not durable — one release later, a different parallel Grok session (running the full `/ft-release` skill, not just the standalone `docs/DOGFOOD.md` procedure) wrote all eight stamp locations anyway while the Claude session was mid-cut. Two of the eight writes carried rationale that failed checking when reconciled by hand (Codex's stated justification was checkably false; Cursor's attribution collided with Grok's own claim), and two tasknote subtask ticks contradicted reality in opposite directions. The rule depends entirely on a session correctly self-identifying "am I the one carrying this to tag/push?" and complying — there is no mechanical backstop if it doesn't.

**Why a dirty check closes this specific race.** Neither session commits mid-cut — both write directly to the uncommitted working tree, and the final commit happens once at closure (§7.4). That means a second writer's `git status --porcelain` on the three stamp files, run immediately before it writes, will show dirt left by a first writer's uncommitted edits. This is the same idiom already used twice elsewhere in this repo: `ft-task`'s Step 2 "foreign-dirt gate" (STOP on non-empty `git status --porcelain` before any scaffold write) and `docs/DOGFOOD.md`'s own Phase 3 verify step (`git status --porcelain` expected empty after a standalone dogfood run). Folding the same check into `ft-release` §5 step 3 requires no new tool or script — one more git invocation inside an existing numbered step — and it catches the exact CORE-500 shape (concurrent uncommitted writes to the same three files) regardless of whether the writing session judged its own role correctly.

**Scope, per the user's answer.** Add the dirty check only; the existing prose rule in both `claude/skills/ft-release/SKILL.md` §5 and `docs/AGENT-COMPAT.md` §"Reading the cells" stays as-is except for one added sentence in each naming the new mechanical backstop, keeping the two in the same parity CORE-406 established (both docs got matching edits then). `docs/DOGFOOD.md` needs no edit — its own procedure already self-verifies via `git status --porcelain` for the standalone case; the gap this task closes is specifically in the `ft-release` §5 walk, same scoping CORE-406 used.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` (doc-only). The new check reuses the exact `git status --porcelain` idiom already established twice in this repo (`ft-task`'s foreign-dirt gate; `docs/DOGFOOD.md`'s own Phase 3 verify step) rather than inventing a new mechanism.

- [x] **Minimal refactor gate** — `N/A`, no code touched. Renumbered the two existing numbered sub-steps (3→4) in `ft-release` SKILL.md §5 that follow the new check, since it's inserted between them; no other renumbering needed (a repo-wide grep confirmed no other reference points at the old step-3/step-4 numbers within this local list).

- [x] Implemented the minimal solution — two insertions, no other file changes:
  - `claude/skills/ft-release/SKILL.md` §5 — new numbered step 3 (dirty check) inserted between the existing "force a resolution" step and the "apply writes" step (renumbered 3→4); one added sentence on the existing "Stamp-write ownership" paragraph naming the backstop.
  - `docs/AGENT-COMPAT.md` §"Reading the cells" — new "Mechanical backstop (CORE-501)" paragraph appended directly under the existing stamp-write-ownership paragraph.

- [x] Updated/added tests — `N/A`, prose-only change; no test surface.

**Implementation Notes:**

Confirmed no other file restates this rule: grepped the repo for "stamp-write" and "release-driving session" — only `claude/skills/ft-release/SKILL.md` and `docs/AGENT-COMPAT.md` matched (the CORE-406 precedent's exact two edit sites), so no third mirror needs updating. `docs/DOGFOOD.md` needs no edit — its own procedure already self-verifies via `git status --porcelain` for the standalone-dogfood case; this task's gap was specifically in the `ft-release` §5 walk. `codex/skills/ft-release/SKILL.md` is a thin wrapper pointing at the Claude skill as canonical (confirmed by the CORE-406 archive note), so no mirrored edit is needed there either.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, prose-only docs; no test suite covers these files (confirmed: no root markdown-lint tooling in this repo, per CORE-406 precedent).

- [x] Ran lint/type-check on changed code — `N/A` for the same reason; performed a manual markdown mental-pass via `git diff` instead: both insertions match surrounding prose style (bold lead-in labels, backtick-fenced commands), local numbered-list renumbering (3→4) is consistent, no broken cross-references introduced.

- [x] **Quality assertions** — no duplication (SKILL.md states the mechanical check once at the point it runs; AGENT-COMPAT.md states the backstop once from the canonical-obligation angle, matching the CORE-406 split between "where it's applied" and "what it obligates"); no dead prose; both edits are additive, no surrounding text needed changes; no public-surface growth beyond the intended check; both edited docs stay internally consistent with each other and with `docs/DOGFOOD.md` (left untouched, correctly — its own procedure already self-verifies for the standalone case).

- [x] (frontend) — `N/A`, not a frontend change.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change (this task's stamps are untouched; it hardens a process rule, not a verification)
  - `docs/AGENT-COMPAT.md` — **updated**: added "Mechanical backstop (CORE-501)" paragraph under §"Reading the cells" stamp-write-ownership paragraph
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change
  - `docs/VISION.md` — no change

  `claude/skills/ft-release/SKILL.md` also updated (matching §5 rule) — not part of the cold-start sweep per README.md (`claude/skills/*/SKILL.md` sit outside the sweep set), noted here for completeness, matching the CORE-406 precedent.

- [x] Closed — both Acceptance criteria ticked (dirty check landed in `ft-release` SKILL.md §5 step 3; matching backstop sentence landed in `docs/AGENT-COMPAT.md`); doc-drift sweep clean above; YAML `status:` flipped to `completed` below; PLAN.md line flips to stub form in the same closure commit; tasknote moves to archive in the same commit.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Closed the `/ft-release` §5 stamp-write-ownership gap CORE-500 surfaced: the rule that only the release-driving session writes dogfood stamp files was prose-only, and a parallel session violated it one release after CORE-406 introduced it. Added a mechanical backstop instead of hardening the wording alone — `ft-release` SKILL.md §5 now runs `git status --porcelain` on the three stamp files (`docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`) immediately before writing (new step 3, existing "apply writes" step renumbered 3→4) and stops for operator reconciliation if they're already dirty. `docs/AGENT-COMPAT.md`'s mirrored obligation paragraph gained a matching "Mechanical backstop (CORE-501)" note, keeping the two docs in the same parity CORE-406 established.

- `claude/skills/ft-release/SKILL.md` (+6/-2 lines) — new numbered step, renumbering, and one added sentence on the existing stamp-write-ownership paragraph.
- `docs/AGENT-COMPAT.md` (+9 lines) — new paragraph under the existing stamp-write-ownership prose.

No code, no test surface — prose-only, same shape as CORE-406. Verification: manual markdown mental-pass via `git diff` (no lint/test tooling applies to prose docs in this repo); confirmed via repo-wide grep that only these two files restate the rule (no third mirror to update) and that `codex/skills/ft-release/SKILL.md` is a thin wrapper needing no mirrored edit; confirmed `docs/DOGFOOD.md` needs no edit — its own standalone procedure already self-verifies via `git status --porcelain` for the case it covers. Doc-drift sweep clean. Maintainability effect: a session that misjudges its own release-driving role is now caught mechanically before it can overwrite another session's uncommitted stamp writes, rather than relying solely on correct self-identification — closing the exact race CORE-500 documented.

**Archived:** 2026-08-29
