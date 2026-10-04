---
title: ft- namespace residue sweep
status: completed
tags: []
created: 2026-05-17
due:
related-tasks: [CORE-104, CORE-105]
---

# CORE-106 | ft- namespace residue sweep

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-104]] [[CORE-105]]

## 🎯 Goal

Fix the three call-sites CORE-104's `ft-` skill-namespace rename missed so `/ft-release`'s drift-sweep subroutine works and the adopter audit-family install recipe in MIGRATION.md §1.2.1 resolves end-to-end.

## ✅ Acceptance

- [x] `docs/MIGRATION.md:99-102` audit-family install recipe split — source path uses `ft-$SKILL` (resolves), destination stays `$SKILL` (adopter fork stays unprefixed per SPEC §"Skill namespace")
- [x] `claude/skills/ft-release/SKILL.md:162` invocation flipped to `Skill(ft-audit-docs)`
- [x] `claude/skills/ft-release/SKILL.md:159, 165, 171` prose refs to `audit-docs` flipped to `ft-audit-docs`
- [x] `claude/skills/ft-micro-task/SKILL.md:123` copy-paste line flipped to `/<ft-task|ft-micro-task|ft-starter-task>`
- [x] Verification grep returns zero unprefixed audit-family / `/task|micro-task|starter-task` residue across the live markdown surface (excluding `_project/tasknote/archive/` and the active CORE-106 tasknote)
- [x] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`)

## 🧩 Subtasks

- [x] Edit `docs/MIGRATION.md:99-102` — split `cp` source (`ft-$SKILL`) vs. destination (`$SKILL`)
- [x] Edit `claude/skills/ft-release/SKILL.md` — flip line 162 invocation + lines 159/165/171 prose refs in one pass
- [x] Edit `claude/skills/ft-micro-task/SKILL.md:123` — copy-paste line
- [x] Run verification grep — confirm only intentional residue remains
- [x] Phase 4 doc-drift sweep + PLAN.md flip + archive

## 🔗 Related

- [[CORE-104]] — the `ft-` namespace prefix rename that this sweep fixes residue from
- [[CORE-105]] — release v3.0.0; blocked on this sweep because `/ft-release` §7.1 invokes `Skill(audit-docs)` which no longer resolves

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Three findings carry from the audit minutes ago; line numbers re-verified (no drift); CORE-105 release is hard-blocked on this work; no scope ambiguity.

- [x] Read relevant source files (`docs/MIGRATION.md` §1.2.1, `claude/skills/ft-release/SKILL.md` §7.1, `claude/skills/ft-micro-task/SKILL.md` Step 5 — all read in the audit immediately upstream)
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — sed verified all 5 cited line numbers unchanged
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** The audit's `AskUserQuestion` locked CORE-108's direction; CORE-106's three fixes have one obvious shape each. Assumption: keep `$SKILL=audit-docs` unchanged (the destination var stays unprefixed per SPEC §"Skill namespace"); only the `cp` source path interpolates `ft-$SKILL`.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Archive skim — CORE-104 (the rename this sweep cleans up after)

CORE-104's omnibus regex `s|/<name>\b|/ft-<name>|g` covered ~14 slash-command forms but missed three call-site **shapes** that don't lead with `/`:

1. **Shell-variable assignment** — `SKILL=audit-docs` (MIGRATION.md:99). The destination var stays unprefixed (correct per SPEC §"Skill namespace" forking rule) but the `cp` source needs the prefix.
2. **Function-call invocation** — `Skill(audit-docs)` (ft-release.md:162). CORE-104 caught this in `.claude/settings.local.json` (per its Phase 2 notes line 181) but missed it inside the release SKILL body.
3. **Angle-bracket alternation** — `/<task|micro-task|starter-task>` (ft-micro-task.md:123). The omnibus regex's `\b` boundary likely matched but the alternation pipes broke the substitution shape.

This is the surgical follow-up — three targeted edits, not another sweep. The rest of CORE-104's surface holds (verified by today's audit's verification grep).

### Drift check — line numbers (re-verified)

- `docs/MIGRATION.md:99` — `SKILL=audit-docs   # or audit, ...` ✓
- `claude/skills/ft-release/SKILL.md:159` — "Invoke the flowtron-self `audit-docs` skill" ✓
- `claude/skills/ft-release/SKILL.md:162` — `Skill(audit-docs)` ✓
- `claude/skills/ft-release/SKILL.md:165` — "`audit-docs` walks its 5 passes" ✓
- `claude/skills/ft-release/SKILL.md:171` — "If `audit-docs` reports zero findings" ✓
- `claude/skills/ft-micro-task/SKILL.md:123` — "Copy-paste line: `/clear then ... then /<task|micro-task|starter-task>`" ✓

All five line numbers match the audit's findings (re-verified ~5 min after the audit closed).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-095 / CORE-076 / CORE-086 are the precedent shape (surgical `Edit` calls with precise old/new strings, not another regex sweep); chose this over CORE-104's omnibus `perl -i -pe` because the residue set is small + heterogeneous and the regex shapes that worked for CORE-104 are exactly what missed these.
- [x] Implemented the minimal solution — three edits across three files
- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract surface only)

**Implementation Notes:**

Three surgical edits:

1. **`docs/MIGRATION.md:99-102`** — split the install recipe so source path interpolates `ft-$SKILL` (resolves) while destination stays `$SKILL` (adopter fork stays unprefixed per SPEC §"Skill namespace"). Added a one-line gloss after the fence explaining the asymmetry so future readers don't "fix" the apparent inconsistency.
2. **`claude/skills/ft-release/SKILL.md`** — flipped 4 references in §7.1 in one Edit call: `Skill(audit-docs)` invocation (line 162) + three prose refs (lines 159, 165, 171) to `ft-audit-docs`.
3. **`claude/skills/ft-micro-task/SKILL.md:123`** — copy-paste line angle-bracket alternation flipped from `/<task|micro-task|starter-task>` to `/<ft-task|ft-micro-task|ft-starter-task>`.

**Verification grep triage** — the omnibus residue grep returned 8 additional hits beyond CORE-106's scope. Triaged:

- **5 false positives (intentional adopter-perspective text):** All `claude/commands/ft-audit*.md` bundled command-stub bodies use bare `audit-docs` / `audit` / etc. — this is correct for the adopter case where the file gets `cp`'d to `.claude/commands/audit-docs.md` and the local fork is named `audit-docs` (unprefixed per SPEC §"Skill namespace"). The body is INSTRUCTIONAL PROSE read by Claude when no matching skill is registered; in adopter context the prose matches the local fork's name. Command stubs are not the load-bearing skill-resolution path (skills resolve by `name:` frontmatter via the registry). Same call applies to `claude/skills/ft-audit-docs/SKILL.md:19` inside the §0 forker checklist (adopters delete §0 after walking it; the text is inert post-fork).
- **2 flowtron-self fork drift hits:** `.claude/commands/ft-audit.md` + `.claude/commands/ft-audit-docs.md` both say bare `audit` / `audit-docs` in their bodies despite living at `ft-` paths in flowtron-self. This is body-vs-filename drift specific to flowtron-self's dual-use repo (acts as both bundle author and as its own adopter). Not a load-bearing invocation (same reasoning as the bundled stubs) so not breaking; filing as Low follow-up rather than expanding CORE-106's surgical scope.
- **2 self-citation hits:** `_project/PLAN.md:14` (CORE-106's own description) + `_project/tasknote/CORE-106.md` (this tasknote citing the residues being fixed). Both intentional.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown contract surface only)
- [x] Ran lint/type-check on changed code — N/A (markdown contract surface only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)

**Testing Notes:**

- Verification grep run post-edit covering the three call-site shapes plus the broader audit-family bare-name surface. The three target call-sites cleared; remaining hits triaged per Phase 2 (5 intentional adopter-perspective + 2 flowtron-self fork drift filed as Low follow-up + 2 self-citations).
- Skill-resolution dogfood deferred to CORE-105's `/ft-release` cut — the next release is the load test for `Skill(ft-audit-docs)`. If it fails, the fix is reverted in the same release motion.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` updated (§1.2.1 install recipe split + one-line gloss) · `claude/CLAUDE-snippet.md` no change
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip — pure markdown surface, all skip signals clear)

**Final Summary:**

Surgical follow-up to CORE-104's `ft-` namespace rename. Fixed the three call-site shapes CORE-104's omnibus regex missed: shell-variable assignment in `docs/MIGRATION.md` §1.2.1 install recipe (split source `ft-$SKILL` vs. dest `$SKILL` so the `cp` resolves and adopter forks stay unprefixed), function-call invocation `Skill(audit-docs)` in `claude/skills/ft-release/SKILL.md:162` (+ three accompanying prose refs), and angle-bracket alternation `/<task|micro-task|starter-task>` in `claude/skills/ft-micro-task/SKILL.md:123`. Unblocks CORE-105's v3.0.0 release cut whose `/ft-release` §7.1 invokes the now-correctly-named `Skill(ft-audit-docs)` subroutine. Verification grep over the broader audit-family surface surfaced 2 flowtron-self fork drift hits at `.claude/commands/ft-audit*.md` (body-vs-filename mismatch, non-load-bearing) — filed as a Low follow-up note in recap rather than expanding CORE-106's surgical scope.

**Archived:** 2026-05-17
