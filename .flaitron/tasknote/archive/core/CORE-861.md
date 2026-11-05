---
title: brand-casing-policy
status: completed
tags: []
created: 2026-11-05
due:
related-tasks: [CORE-860, CORE-863]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - brand/BRAND.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-861 | brand-casing-policy

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-860]] · [[CORE-863]]

## 🎯 Goal

Decide and record which casings of the brand name flaitron's own tracked text allows, then file the PLAN row(s) that bring the tree to that rule and enforce it.

## ✅ Acceptance

- [x] The casing rule is recorded once, in `brand/BRAND.md`'s free body: `flaitron` always lowercase, `FLAITRON` only for the business, archive exempt, identifiers out of scope — `grep -q '^## Name casing$' brand/BRAND.md`, plus `judgment` that the prose states all four points
- [x] `.flaitron/PLAN.md` carries one new open row, CORE-863, `[moderate]` with `| brand-casing-guard`, combining the rename and the guard, within the 70-word cap — `grep -cE '^- \[ \] \*\*CORE-863\*\* \[moderate\] \| brand-casing-guard — ' .flaitron/PLAN.md` prints `1`; word count via `wc -w`
- [x] All drift checks still pass on the edited tree — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add `## Name casing` to `brand/BRAND.md` below the free-body line
- [x] File CORE-863 under `## Low` (the source row's priority), ≤70 words
- [x] Run the drift checks; record receipts
- [x] Close: CORE-861 row → Completed stub, archive the note, and commit the rule, the row, and the stub together (`SPEC/plan-filing.md` §"Filing commits": a row a closure files as its deliverable rides the closure commit)

## 🔗 Related

- [[CORE-860]] — predecessor: the near-miss spelling guard; left casing to this task.
- [[CORE-863]] — follow-up filed here: apply the rule (rename) and enforce it (guard).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-860 landed the spelling guard and explicitly left casing here; nothing in the tree has settled it since. The task is a decision plus a filing, and both remain open.

- [x] Read relevant source files — flaitron-site `scripts/copy-guard.sh` (brand block) and `VISION.md` (app table: the framework is "always lowercase"), flaitron-site `brand/BRAND.md`; natabula `NAT-522` (archived, the filing origin); this repo's `brand/BRAND.md`, `brand/README.md`, `tools/drift-checks.sh` `brand_nearmiss`, `SPEC/plan-filing.md` §"ID allocation" / §"Filing commits".

- [x] **Best Practices Review** — N/A: no code or module boundary changes here. Guard design notes for CORE-863 are below.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Grepped for `casing|lowercase|title-case|capital` across the CORE-711 rename epic, CORE-712, CORE-851, and CORE-857. The only hits are in CORE-711.4. Its sweep mapped `Flowtron`→`Flaitron` mechanically, so title-case was carried over from the rename and never chosen. Its `[Ff]l(ow|ai)tron` check is about filesystem path casing, not brand text. CORE-860 (just archived) states that casing belongs to this task.

- [x] **Drift check** — the PLAN row says 261 matches in 100 files; measured 262 in 100 (`git grep -o 'Flaitron' | wc -l`). The +1 comes from CORE-860's test fixture, so there is no material drift. Outside the archive and PLAN: 173 matches in 72 files. The heading claim holds: `# Flaitron — Workflow Specification` is matched literally by 10 skill bodies, `install.sh` (`SPEC_HEADING`) and `tools/install.test.sh`. The plan matches its PLAN line.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Operator decisions (AskUserQuestion, 2026-11-05):** (1) **lowercase only**: the framework is always `flaitron`, sentence starts and headings included. `FLAITRON` is accepted for the business, matching the site guard. Live title-case gets renamed and the archive is exempt. (2) **One follow-up row** carries the rename, the heading matchers, and the guard in a single atomic commit, the same shape as CORE-860.
- **Where title-case lives now:** headings and sentence starts (~95), the Codex wrapper `description:` lines, the viz `<title>` / `AppHeader` with two `App.test.tsx` assertions, the `BRAND.md` blurb fields, `assets.json` `display_name`, and the SVG `aria-label`s. Code identifiers such as `cachedFlaitronFile` and the `FLAITRON_*` env vars are not standalone words under `brand_nearmiss`'s boundary class (`[[:alnum:]_]`), so a word-bounded check skips them.
- **Deliberate case fixtures CORE-863 must keep:** `tools/update-adopters.test.mjs:790` (`Org/Flaitron.git` tests the case-insensitive URL match) and its comment at `tools/update-adopters.mjs:618`. Each needs a narrow exemption or a rewrite that keeps the test's intent, not a blind rename.
- **Heading rename:** adopter skills resolve `.flaitron/core/SPEC.md` first, and their self-host detection only runs inside this checkout, at the same commit as its skills, so the skills are safe. `install.sh` is not. *(Corrected after the External review: this note first had the direction backwards.)* `is_flaitron_tree` (`install.sh:59-60`) byte-compares line 1 of a tree's `SPEC.md`, and it runs on an adopter's pinned `.flaitron/core` (`:371`), on `FLAITRON_HOME` (`:291`) and under `FLAITRON_VERSION`. A post-rename installer would refuse every pre-rename pin, so CORE-863's matchers must accept both headings.
- **Home of the rule:** `brand/BRAND.md`'s free body ("voice notes, what not to say"). It is the one brand contract file, so the rule sits there and nowhere else. The `BRAND.md` blurb fields and `assets.json` keep their title-case until CORE-863, so the brand edit lands as one sweep. The operator-private brand validator checks those fields, so a piecemeal edit here would split the review.
- **Assumptions:** CORE-863 goes under `## Low` at `[moderate]` (multi-file, well-scoped, has a precedent). No other open rows exist, so the downstream-impact scan finds nothing to reconcile.
- Discovery's only open question was the policy choice, and the operator settled it inside Discovery → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: `brand/BRAND.md`'s free body, which its own text sets aside for voice notes and "what not to say", and the standard PLAN row grammar under `## Low`.

- [x] **Minimal refactor gate** — no refactor. The title-case blurb fields in `BRAND.md` were deliberately left for CORE-863's single sweep (Discovery Notes).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose and one PLAN row, no code. The drift checks guard the edited PLAN and markdown.

**Implementation Notes:**

- `brand/BRAND.md`: added `## Name casing`, four bullets: framework always lowercase, `FLAITRON` business-only, every other casing wrong with the archive exempt, identifiers out of scope. The section avoids the literal title-case token, so CORE-863's guard won't hit its own rule text.
- `.flaitron/PLAN.md`: filed CORE-863 (`[moderate]`, `brand-casing-guard`, 55 words) above CORE-861 under `## Low`. Its next free ID came from the §"ID allocation" scan (max 862).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code; `bash tools/drift-checks.sh` is the check that covers the edited PLAN and markdown.

- [x] Ran lint/type-check on changed code — N/A: markdown only; `git diff --check` for whitespace.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface changed.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q '^## Name casing$' brand/BRAND.md` → 0. Judgment: the section states all four points (lowercase framework; `FLAITRON` for the business only, enforced by review; other casings wrong, with the tasknote archive and PLAN-ARCHIVE exempt; joined identifiers out of scope).
- `grep -cE '^- \[ \] \*\*CORE-863\*\* \[moderate\] \| brand-casing-guard — ' .flaitron/PLAN.md` → 0, prints `1`; description `wc -w` → `63` (cap 70).
- `bash tools/drift-checks.sh` → 0 (20 lines, all ` ok`, `brand_nearmiss` and `pair_r` included).
- `git diff --check` → 0.
- Standalone title-case scan of `brand/BRAND.md` → only lines 3–4 (blurb fields), which the section's pending note names as CORE-863's.
- **External review** (`/code-review medium`, forked, over this task's working-tree diff only; the tree was clean at entry): 0 blockers, 7 notes, all fixed in Phase 2 before closure:
  1. The Discovery note had `install.sh`'s cross-version risk backwards. A newer installer would refuse pre-rename pins (`install.sh:59-60,291,371`, verified). → Corrected the note; the row now requires matchers that accept both headings.
  2. The row's fixture list missed the drift self-test fixture. → Row names "URL test, drift self-test".
  3. `BRAND.md`'s rule contradicted its own title-case blurb fields. → Added a pending note naming CORE-863. The row says to drop that note.
  4. The exemption missed append-only `PLAN-ARCHIVE.md`. → Rule and row now exempt it.
  5. The row's enumerated rename list was incomplete (Codex descriptions, PLAN heading, SVG labels, PROMPTS), and the `brand_nearmiss` comment would go stale. → Row now says "every live title-case hit" and "retarget the `brand_nearmiss` comment".
  6. The business-only meaning of `FLAITRON` can't be checked. → Rule says review enforces it.
  7. The identifier boundary was undefined. → Rule now defines it: joined to word characters means exempt; a standalone name follows the rule.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. The rule lives in `brand/BRAND.md`, and CORE-863 will wire the guard and its catalogue entry; the always-loaded layer needs no line until then.

**Final Summary:**

Settled the casing policy with the operator: the framework is always `flaitron`, `FLAITRON` is for the business only, and every other casing is wrong outside write-once history. Recorded it once, as `brand/BRAND.md` §"Name casing". Filed CORE-863 (`[moderate]`, 63 words) to lowercase every live title-case hit and land a word-bounded guard in one commit. Its heading matchers must accept both `SPEC.md` headings, because `install.sh` checks older pinned cores. Drift checks pass. The External review raised 7 notes and no blockers; all were fixed before closure, including a reversed cross-version claim in Discovery. No refactor and no code change.

Doc-drift sweep, per declared entry: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: no change to any of them. Their title-case text is CORE-863's rename, and no contract changed here.

`touches:` reconciliation: declared `brand/BRAND.md` and `.flaitron/PLAN.md`; `git diff --name-only` shows the same two, plus this workflow note. Maintainability: one canonical rule home, and a follow-up row that carries its compatibility constraint so the implementer doesn't rediscover it.

**Archived:** 2026-11-05
