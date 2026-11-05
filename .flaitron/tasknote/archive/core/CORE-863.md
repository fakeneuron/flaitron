---
title: brand-casing-guard
status: completed
tags: []
created: 2026-11-05
due:
related-tasks: [CORE-861, CORE-860]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - install.sh
  - tools/install.test.sh
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
  - brand/**
  - '**' # the mechanical rename: 73 live files, listed by the Drift check scan
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-863 | brand-casing-guard

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-861]] · [[CORE-860]]

## 🎯 Goal

Bring every live tracked file to `brand/BRAND.md` §"Name casing" (framework always `flaitron`) and add a drift check that keeps it there, without breaking `install.sh` on older pinned cores.

- [x] No live standalone title-case (or other mixed-case) hit remains outside the tasknote archive, PLAN-ARCHIVE, the two drift-check sources and marked fixture lines — `bash tools/drift-checks.sh brand_casing`
- [x] `brand_casing` has a seeded case, an isolated accept/reject fixture test, and the floor — `node --test tools/drift-checks.test.mjs`
- [x] `install.sh` accepts both the old title-case and the new lowercase `SPEC.md` heading — `shellcheck -s sh install.sh tools/install.test.sh` and `sh tools/install.test.sh install.sh` (old-heading fixture kept, new-heading check added)
- [x] Deliberate case fixtures kept and marked: URL test, its comment, the installer's old-heading fixture — `git grep -c 'brand-casing: fixture'` (3 hits outside the check and its docs)
- [x] `BRAND.md` pending note dropped, blurb fields / `assets.json` / SVG labels lowercased, marker documented — `grep -c 'until CORE-863' brand/BRAND.md` prints `0`; `judgment` that the marker line reads correctly
- [x] Catalogue entry for `brand_casing`, release invocation and counts updated, `brand_nearmiss` comment retargeted — `grep -q brand_casing claude/skills/ft-release/step-7.1-mirror-pairs.md`, `bash tools/drift-checks.sh` (all ok, `context_budget` and `pair_q` included)
- [x] Declared validation stays green — the eight `AGENTS.md` §"Validation" commands (viz tests cover the header rename)
🧩 Subtasks

- [x] Add `brand_casing` to `tools/drift-checks.sh` after `brand_nearmiss`; retarget the `brand_nearmiss` comment
- [x] Rewrite `install.sh`'s heading matcher to accept both casings without a literal title-case word; add a lowercase-heading refusal check to `tools/install.test.sh`, mark the old-heading fixture
- [x] Mark the URL fixture and its comment in `tools/update-adopters*.mjs`
- [x] Mechanical rename of every remaining standalone title-case → `flaitron` in live tracked text (viz header + test assertions included)
- [x] `brand/BRAND.md`: lowercase the blurb fields, drop the pending note, document the marker; `assets.json`, SVG labels, `PROMPTS.md`
- [x] Seeded CASES entry + isolated fixture tests in `tools/drift-checks.test.mjs`
- [x] Catalogue entry, invocation line and count in `step-7.1-mirror-pairs.md`; `docs/CONVENTIONS.md` mirror
- [x] Run validation, External review, close

## 🔗 Related

- [[CORE-861]] — predecessor: the casing rule this task applies and enforces.
- [[CORE-860]] — the `brand_nearmiss` spelling guard this check sits beside.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-861 recorded the rule and left the rename and guard here; the tree still carries 177 live title-case hits and `BRAND.md`'s pending note still names this task.

- [x] Read relevant source files — `brand/BRAND.md`, `tools/drift-checks.sh` (header shape rules, `brand_nearmiss`), `tools/drift-checks.test.mjs` (CASES, floor test, near-miss fixture describe), `install.sh` (`SPEC_HEADING`, `is_flaitron_tree` at :59-60, callers :291/:349/:371), `tools/install.test.sh:116`, `tools/update-adopters.mjs:618`, `tools/update-adopters.test.mjs:790`, `step-7.1-mirror-pairs.md` invocation + catalogue, `docs/CONVENTIONS.md:58`.

- [x] **Best Practices Review** — one new function in the existing one-function-per-check dispatcher, with its own floor, seeded case and catalogue entry; no shared helper with `brand_nearmiss` (different read set and matcher, and the header forbids non-check top-level functions). `install.sh` keeps one matcher function, now a `case` glob.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Read CORE-861 (rule, fixture list, the corrected `install.sh` cross-version note) and CORE-860 (`brand_nearmiss` design: null-delimited paths, POSIX boundaries, `grep -I`, exit-code handling, one CASES entry plus isolated fixture tests). CORE-711.4's `[Ff]l(ow|ai)tron` note is about path casing, not brand text.

- [x] **Drift check** — PLAN row matches CORE-861's filing. Live standalone title-case: 177 occurrences on 165 lines in 73 files (`git grep -nE '(^|[^[:alnum:]_])F[l]aitron([^[:alnum:]_]|$)' -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'`); no other mixed casing exists. Standalone `FLAITRON` appears only in `BRAND.md`'s rule and the drift self-test fixture. Section headings with the word (`SPEC.md` §"What is flaitron", `EXTERNAL-AGENTS.md` / `WORKTREES.md` §"Relationship to the Rest of flaitron", named here in their new casing) rename with their citations; `pair_q` re-verifies. One more matcher found beyond CORE-861's list: `ft-update/SKILL.md:36` names the heading as a negative guard; it runs only in adopters, so plain lowercasing is safe.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Operator decision (AskUserQuestion, 2026-11-05):** the fixtures are exempted by a line marker, `brand-casing: fixture`, not by whole-file exclusions. Only the two drift-check sources are excluded by file, as in `brand_nearmiss`.
- **Matcher:** for each tracked text file with a case-insensitive `flaitron` (`git grep -lIiz`), awk scans every word-bounded occurrence (`[[:alnum:]_]` boundary, same as `brand_nearmiss`) and flags any one that is neither `flaitron` nor `FLAITRON`. Joined identifiers (`FLAITRON_HOME`, `cachedFlaitronFile`) are not standalone, so they pass. `LC_ALL=C` keeps `tolower` ASCII-only and byte offsets stable. Exempt: the archive, `PLAN-ARCHIVE.md`, the two drift-check sources, and marked lines.
- **`install.sh`:** `case` pattern `'# '[Ff]'laitron — Workflow Specification'` accepts both headings with no literal title-case word, so it needs no marker.
- **Assumptions:** sentence starts and headings go lowercase too (CORE-861's operator decision). The skill self-host detections are lowercased only, since they run inside this checkout at the same commit. Archived tasknotes keep their casing; a `pair_q` citation from the archive into a renamed heading is out of scope, because `pair_q` excludes the archive.
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `brand_casing` copies `brand_nearmiss`'s shape (null-delimited read, `[[:alnum:]_]` boundary, `rc` 0/1/other handling, `BRAND SCAN ERROR`, floor), and its tests copy the near-miss CASES entry plus an isolated git fixture. The matcher is awk rather than grep, because one line can carry a good and a bad occurrence and ERE can't express "any casing but two".

- [x] **Minimal refactor gate** — the only refactor is `install.sh`'s matcher: `SPEC_HEADING` + `=` became a `case` glob, required by Acceptance (both headings, no literal title-case word). No other cleanup.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/drift-checks.sh`: added `brand_casing`; retargeted the `brand_nearmiss` comment. First run surfaced a BSD-awk quirk: `substr(s, 0, 1)` returns the first character, so hits at column 1 were missed (118 vs 160 expected). Fixed with an explicit `p > 1` guard and a comment; after the fix, the check's hit set equals the reference `git grep` scan minus exactly the 4 exempt lines.
- `install.sh`: `is_flaitron_tree` matches `'# '[Ff]'laitron — Workflow Specification'`; `SPEC_HEADING` removed (sole use). `tools/install.test.sh`: old-heading refusal kept (marked), lowercase-heading refusal added.
- Marked fixtures: `tools/update-adopters.mjs:618`, `tools/update-adopters.test.mjs:790`, `tools/install.test.sh:116`.
- Mechanical rename: `perl` lookaround replace of the standalone title-case name over the 68 files the check listed (viz `<title>`, `AppHeader`, both `App.test.tsx` assertions, Codex descriptions, all SPEC/doc headings and their citations).
- `brand/BRAND.md`: pending note replaced by a bullet naming the check and the marker. `brand/PROMPTS.md`: the CORE-711.4 provenance line notes CORE-863 lowercased the labels, so history stays accurate.
- Tests: `brand_casing` CASES seed + `brand casing matching` describe (accept: both casings, path, identifiers, `_`-joined, marked line, archive, PLAN-ARCHIVE, sources, binary, untracked; reject: line start, after a good hit, mixed case).
- Catalogue: invocation + "Fifteen `ok` lines", `brand_nearmiss` entry retargeted, new `brand_casing` entry. `docs/CONVENTIONS.md`: guards plural, "seventeen functions", invocation.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — operator replied "go" (2026-11-05)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh brand_casing` → 0 (`brand_casing ok`). Before the rename it listed exactly the reference scan's lines minus the 4 exempt ones.
- `node --test tools/drift-checks.test.mjs` → 0 (27 tests: the `brand_casing` seeded case and the 2-test `brand casing matching` describe included).
- `shellcheck -s sh install.sh tools/install.test.sh` → 0. `sh tools/install.test.sh install.sh` → 0, `ALL PASS (sh)`. It covers both heading refusals, and its network install of the real v8.3.0 pin (title-case heading) passed under the new matcher.
- `git grep -n 'brand-casing: fixture'` → the 3 marked fixtures (`install.test.sh:116`, `update-adopters.mjs:618`, `update-adopters.test.mjs:790`), plus the check, its test, and the backticked documentation lines.
- `grep -c 'until CORE-863' brand/BRAND.md` → prints `0`. Judgment: the new bullet names the check and the marker.
- `grep -q brand_casing claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0. `bash tools/drift-checks.sh` → 0 (22 `ok` lines, `context_budget` and `pair_q` included).
- `npm --prefix viz test` → 0 (647). `typecheck` / `lint` / `build` → 0. `node --test tools/update-adopters.test.mjs` → 0 (122). Both `node --check` → 0. `git diff --check` → 0.
- **External review** (`/code-review medium`, forked, over this task's working-tree diff only; the tree was clean at entry): 0 blockers, 7 notes:
  1. Old published installers refuse a core with the lowercase heading. **Operator: accept + release note.** Filed CORE-864 (`[light]`), so the release that ships this tells users to fetch the latest installer.
  2. The skills' self-host matchers accept only the lowercase heading. Dismissed: a checkout at an old tag runs its own old skill bodies, which match the old heading, and `ft-update` runs only from adopter pins.
  3. A bare-substring marker also exempted the lines that document it. → Fixed: a backticked mention no longer exempts its line. Code lines stay whole-line exempt, as `BRAND.md` says ("marks its line").
  4. natabula `scripts/wave-bump.sh:101` (and its test, :78/:124) detects self-host by the title-case heading only. Verified; a submodule filter shields it today. **Operator: file a NAT row** (copy-paste in the recap), with no edit to natabula from here.
  5. This active tasknote carried title-case mentions that would turn CI red on a WIP or park commit. → Fixed: reworded, 0 hits.
  6. One awk process per file is slow. Dismissed with a measurement: `brand_casing` 1.6s vs the existing `brand_nearmiss` 12.5s.
  7. No test covered the marker's scope or several hits on one line. → Fixed: added a backticked-marker reject case and a two-hit line case.
- 👁️ ask: the viz header and `<title>` now read `flaitron — …`; the two `App.test.tsx` assertions pin it. Asked with 👁️ CONFIRM in Phase 3; the operator replied "go".

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. The rule's home is `brand/BRAND.md`, and CI enforces it, so the always-loaded layer needs no line.

**Final Summary:**

Lowercased every live standalone title-case name across 68 files by mechanical replace, plus hand edits to `brand/BRAND.md` (pending note → enforcement bullet), `brand/PROMPTS.md` (provenance stays accurate) and `install.sh`. Added the `brand_casing` drift check: awk walks each occurrence; exempt are the archive, PLAN-ARCHIVE, the two drift-check sources, and lines marked `brand-casing: fixture` (a backticked mention doesn't count as a mark). It has a seeded case, isolated accept/reject tests, and a catalogue entry. `install.sh` now accepts both `SPEC.md` headings via a `case` glob; the e2e test installed the real title-case v8.3.0 pin. The 3 deliberate fixtures are marked. External review: 7 notes, 0 blockers. 3 were fixed, 2 dismissed with evidence, and 2 settled by the operator: CORE-864 filed for the release note, and a natabula `wave-bump.sh` row handed to the operator. All eight validation commands, the full drift run and the installer test pass.

Doc-drift sweep, per declared entry: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: casing-only updates from the rename, no contract change (no `EXTERNAL-AGENTS.md` stable-surface row moved). `docs/CONVENTIONS.md`: updated for the second brand guard and "seventeen functions" (plus casing). `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `claude/CAPABILITIES.md`: no change.

`touches:` reconciliation: `git diff --name-only` gives 73 modified files plus this note and `.flaitron/PLAN.md` (CORE-864 filed, CORE-863 stub). All of them fall under the declared paths and the `'**'` rename glob. Maintainability: one rule home, one CI-enforced check, and an installer that tolerates both heading generations.

**Archived:** 2026-11-05
