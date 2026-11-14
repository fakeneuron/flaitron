---
title: gitleaks-allowlist-rule-scope
status: completed
tags: [security, ci]
created: 2026-11-14
due:
related-tasks: [CORE-578, CORE-652.2]
touches:
  - .gitleaks.toml
---

# CORE-903 | gitleaks-allowlist-rule-scope

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-578]] · [[CORE-652.2]]

## 🎯 Goal

Scope `.gitleaks.toml`'s three path allowlists to `generic-api-key`, so every other rule (`private-key`, `jwt`, `aws`, …) still fires inside test files, placeholder files and archived tasknotes.

## ✅ Acceptance

- [x] Each of the three `[[allowlists]]` tables carries `targetRules = ["generic-api-key"]` — `python3 -c "import tomllib;a=tomllib.load(open('.gitleaks.toml','rb'))['allowlists'];assert len(a)==3 and all(x.get('targetRules')==['generic-api-key'] for x in a)"`
- [x] A PEM private key in an allowlisted test path is now reported — `sh <scratchpad>/repro.sh .gitleaks.toml` (path in Discovery Notes) lists `('private-key', 'tests/key.test.ts')` beside `app.ts`
- [x] The repo tree stays clean under the new config — `gitleaks dir . --config .gitleaks.toml --no-banner --redact` → exit 0
- [x] The header comment no longer claims rules stay live "inside these files" without the scoping that makes it true — `judgment`: prose accuracy, read against the config

## 🧩 Subtasks

- [x] Add `targetRules = ["generic-api-key"]` to each of the three allowlist tables
- [x] Reword the "keeps every high-confidence rule live" comment and the "byte-identical to the source" provenance line
- [x] Re-run the repro and the full-tree scan

## 🔗 Related

- [[CORE-578]] — deposited this `.gitleaks.toml` from natabula's baseline (predecessor)
- [[CORE-652.2]] — reworded the deposit's comments to stand alone (predecessor)
- natabula NAT-618 — the same fix in the source baseline (follow-up, filed by this task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Reproduced on gitleaks 8.30.1: a PEM key in `tests/key.test.ts` goes unreported while the same key in `app.ts` fires. gitleaks `[[allowlists]]` without `targetRules` apply to every rule.

- [x] Read relevant source files — `.gitleaks.toml`; natabula's `configs/.gitleaks.toml` (sibling, read-only)

- [x] **Best Practices Review** — `N/A`: one config file, no code module or dependency direction

- [x] **Archive skim** — 23 hits in `archive/core/` name `.gitleaks.toml`; the load-bearing two read: CORE-578 (deposited verbatim from natabula's baseline, CI pins gitleaks 8.30.1) and CORE-652.2 (comments reworded, `paths` kept identical to the source, header states the comment divergence).

- [x] **Drift check** — the PLAN line matches the file: three path allowlists, none with `targetRules`. The header already claims the rules are "byte-identical to the source", but natabula carries a fourth `*.test.sh` path. That drift predates this task; the provenance line is reworded here rather than repeated.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — AskUserQuestion (2026-11-14): natabula side → file a NAT row (NAT-618, natabula `cf7e70a`), not edited here. Assumption: `generic-api-key` is the only rule these allowlists need, since every measured hit in the comment's own provenance was that rule.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Repro script: `/private/tmp/claude-501/-Users-fakeneuron-Code-flaitron/faa92c72-aeeb-4bfe-80c8-55a303bb86c5/scratchpad/repro.sh` (throwaway tree, generated key). Baseline run: `exit=1`, `[('private-key', 'app.ts')]`. The test-file key is missing.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no repo test harness for gitleaks config; the scratchpad repro is the behavioural check and is recorded below

**Implementation Notes:**

- Pattern: the native gitleaks `targetRules` key on each existing `[[allowlists]]` table, with no new shape. `paths` arrays are unchanged.
- Header provenance now names both differences from the source (`*.test.sh`, `targetRules`) and warns that a refresh before NAT-618 lands would revert the scoping. The rule-scope comment now says what `targetRules` does and that the upstream default's global allowlist still applies.
- No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — repro + full-tree scan (receipt below)

- [x] Ran lint/type-check on changed code — `tomllib` parse + `bash tools/drift-checks.sh`

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: config file, no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `uv run --no-project --python 3.12 python -c "import tomllib;…assert … targetRules …"` → 0 (system `python3` lacks `tomllib`; first attempt `ModuleNotFoundError`)
- `sh …/scratchpad/repro.sh .gitleaks.toml` → `exit=1`, `[('private-key', 'app.ts'), ('private-key', 'tests/key.test.ts')]` (before the fix: `app.ts` only)
- `gitleaks dir . --config .gitleaks.toml --no-banner --redact` → 0, "no leaks found" (gitleaks 8.30.1)
- `bash tools/drift-checks.sh` → 0
- External review: `/code-review medium .gitleaks.toml` returned 5 notes and no blockers. Fixed: (1) "the source follows it" claimed done what NAT-618 has only filed; (2) a refresh could silently revert the fix, so the header now says to keep `targetRules`; (3) the provenance line listed only one difference; (4) "stays live everywhere" ignored the upstream default's global allowlist. Not fixed or filed: (5) `tools/*.test.{mjs,sh}` are not allowlisted for `generic-api-key`. The file's own rule is to allowlist paths only after a measured hit, and there is none.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Recap:** `.gitleaks.toml` (+3 `targetRules` lines, header and rule-scope comments reworded) plus PLAN and this note. Verification above is all exit-clean. No refactor. Doc-drift sweep: no change; no AI-referenced doc describes allowlist scope. `touches:` reconciliation: `git diff --name-only` = `.gitleaks.toml` + workflow files, matching the declaration. Maintainability effect: the allowlists now silence only the rule they were measured for, and the header records the temporary divergence from the source. natabula NAT-618 (`cf7e70a`, local) carries the source fix.

**Learnings:** N/A. The gitleaks behaviour now sits in the config's own comment, which is where the next editor will look.

**Archived:** 2026-11-14
