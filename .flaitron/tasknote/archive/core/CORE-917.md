---
title: arch-health-refresh
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-901]
touches:
  - .github/workflows/arch-health.yml
  - AGENTS.md
  - .gitignore
  - SECURITY.md
  - docs/CONVENTIONS.md
  - docs/CONTEXT-BUDGET.md
  - .flaitron/PLAN.md
---

# CORE-917 | arch-health-refresh

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-901]]

## 🎯 Goal

Bring flaitron's self-hosted arch-health copy (CORE-901) up to natabula NAT-645/646: success-only upload, a report gate that also fires on a timed-out scheduled run, a `## Repo map` AGENTS.md section with an overwrite-safe fetch and a no-artifact fallback, and an anchored `/arch/` ignore line.

## ✅ Acceptance

- [x] Upload runs on success only and no comment promises partial output — `! grep -q "if: always()" .github/workflows/arch-health.yml && ! grep -qi "even after a tool failure" .github/workflows/arch-health.yml`
- [x] `report-failure` gate matches natabula's NAT-645 form — `grep -q "contains(needs.\*.result, 'cancelled')" .github/workflows/arch-health.yml && ! grep -q "if: failure() &&" .github/workflows/arch-health.yml`
- [x] Workflow diff against natabula's deposit adds no hunk beyond CORE-901's recorded deltas — `judgment`: read `diff ../natabula/configs/.github/workflows/arch-health.yml .github/workflows/arch-health.yml`
- [x] Workflow parses as YAML and every `uses:` stays SHA-pinned — `ruby -ryaml -e 'YAML.load_file(".github/workflows/arch-health.yml")' && ! grep -E 'uses: ' .github/workflows/arch-health.yml | grep -vE '@[0-9a-f]{40} # v'`
- [x] AGENTS.md block equals natabula's template with only `Fleet HQ` → `natabula` — `sed -n '\#arch-health:start#,\#arch-health:end#p' AGENTS.md | diff - <(sed 's#Fleet HQ#natabula#' ../natabula/templates/arch-health/agents-pointer.md)`
- [x] `.gitignore` anchored — `grep -qx '[/]arch/' .gitignore && ! grep -qx 'arch/' .gitignore && git check-ignore -q arch/x`
- [x] Drift checks + updater/drift self-tests green — `bash tools/drift-checks.sh && node --test tools/drift-checks.test.mjs`

## 🧩 Subtasks

- [x] Workflow: header red-run paragraph, upload `if` + comment, `report-failure` gate + comment, issue body texts (natabula wording, `Fleet HQ` → `natabula`)
- [x] AGENTS.md: replace the pointer block with the template's `## Repo map` section
- [x] `.gitignore`: `arch/` → `/arch/` (note unchanged, as the wave refreshes it)
- [x] SECURITY.md + docs/CONVENTIONS.md: report gate covers a timed-out run
- [x] docs/CONTEXT-BUDGET.md: re-measure the `AGENTS.md` row
- [x] Verify

## 🔗 Related

- [[CORE-901]] — adopted the workflow, ignore line, and pointer block this task refreshes
- natabula NAT-645 / NAT-646 — the source fixes; NAT-651 filed this row

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** HEAD still has `if: always()` on the upload, a `failure()`-only gate, the bold-lead pointer with a bare fetch, and an unanchored `arch/`; natabula's deposit (`f83ddb2`) and template carry the fixes.

- [x] Read relevant source files — flaitron `.github/workflows/arch-health.yml`, AGENTS.md block, `.gitignore`, SECURITY.md §"Arch-health report", docs/CONVENTIONS.md:68, docs/CONTEXT-BUDGET.md ledger; natabula deposit, `templates/arch-health/agents-pointer.md`, `scripts/install-wave.sh` recipe, NAT-645/646/651 tasknotes

- [x] **Best Practices Review** — N/A: workflow config and prose, no module boundaries

- [x] **Archive skim** — `archive/core/` (README table `CORE-*`). Hits: CORE-901 (adoption; deltas list, SHA pins, byte-identical-pointer acceptance), CORE-896 / CORE-912 (budget ledger lines, release mention), CORE-906 (overlay invariant names `report-failure`'s `issues: write` — unchanged here), CORE-915 (read the map; no bearing).

- [x] **Drift check** — PLAN line matches HEAD. One deviation from NAT-645's tasknote: natabula's committed gate is `!cancelled() && …` (not `always()`), so a manual or concurrency cancel opens nothing; this task copies the committed form.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Clarification (AskUserQuestion, 2026-11-24): pointer block keeps `natabula`, not the template's public-safe `Fleet HQ`; one-word diff against the template.
- Assumptions: the block stays where CORE-901 put it (before the Grok block); the `.gitignore` note stays the wave's note (the wave refreshes the line in place); natabula's own `.gitignore` note rewrite is natabula-only. Upload keeps its SHA pin; the Python header bullet stays dropped.
- Doc drift found: SECURITY.md "runs only after a failed scheduled run" and CONVENTIONS.md "goes red only when a tool fails, which opens … issue" — both gain the timeout case.

Exit-gate judgment: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no harness covers workflow `if:` expressions; YAML parse + greps + the drift suite stand in (as at natabula NAT-645)

**Implementation Notes:**

- Pattern: CORE-901's re-sync recipe — copy natabula's changed hunks verbatim (`Fleet HQ` → `natabula`), keep the recorded deltas (viz-only detect, Node 24, SHA pins, no Python steps). The upload step keeps its SHA pin and loses only `if: always()`.
- Workflow: header red-run paragraph (success-only upload, timeout reports), upload comment, `report-failure` gate `!cancelled() && schedule && (failure || cancelled)` with its comment, issue body + create text name the timeout.
- AGENTS.md: block replaced with the template's `## Repo map` section, in CORE-901's place (before the Grok block).
- `.gitignore`: `arch/` → `/arch/`; note unchanged (the NAT-651 wave refreshes the line in place, keeping the note).
- SECURITY.md / docs/CONVENTIONS.md: the report job also covers a timed-out run; CONVENTIONS names the green-only upload and the new §"Repo map" heading.
- docs/CONTEXT-BUDGET.md: `AGENTS.md` row 9,663 → 9,835 bytes (`wc -c`, the ledger's existing measure) plus a re-measure line.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → pass 44, fail 0

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0; `actionlint` not installed, YAML parse stands in

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no UI surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 upload success-only greps → 0
- A2 gate greps → 0
- A3 `diff ../natabula/configs/.github/workflows/arch-health.yml .github/workflows/arch-health.yml` → remaining hunks are only CORE-901's recorded deltas (header, viz detect, Node 24, SHA pins, Python steps dropped) plus the header fetch-line fix below; judgment met
- A4 `ruby -ryaml …` + SHA-pin grep → 0 (re-run after the review fix → 0)
- A5 block diff against the template with `Fleet HQ` → `natabula` → 0 (the first spelling used `/…/` sed addresses and tripped the path guard as a false positive; `\#…#` form recorded above)
- A6 `.gitignore` anchored + `git check-ignore -q arch/x` → 0
- A7 `bash tools/drift-checks.sh` → 0 (re-run after the fix → 0); `node --test tools/drift-checks.test.mjs` → 44/0
- **External review** (`/code-review medium`, uncommitted working tree):
  - Important — `!cancelled()` might be true after a job timeout, skipping the reporter. No change: GitHub's `cancelled()` reports a *run* cancellation, and a job timeout cancels only the job; natabula committed this exact form (NAT-645) and parity is the task. Not provable without a live scheduled timeout; left as natabula's call.
  - Nit — workflow header still gave the bare fetch and "pointer line" → fixed (`rm -rf arch && …`, AGENTS.md §"Repo map"). natabula's own header carries the same stale line.
  - Nit — `rm -rf arch` wipes the old map before a failed download → no change: template wording, kept for parity; `arch/` is ephemeral and the fallback says plan from source.
  - Three findings on `tools/update-adopters.mjs` / `claude/skills/ft-update/SKILL.md` are outside this diff (CORE-916's committed code, swept in by the reviewer) → not this task's; reported to the operator.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — SECURITY.md and docs/CONVENTIONS.md updated (timeout case, green-only upload, §"Repo map" name); README.md `.github/` line generic → no change; every other AI-referenced doc → no change (no arch-health mention)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A (the `\#…#` sed-address workaround for the path guard is already a known pattern, natabula BP-2621.1)

**Final Summary:** flaitron's self-hosted arch-health now matches natabula NAT-645/646. The artifact uploads on green runs only, and the tracking issue also opens on a timed-out scheduled run (`!cancelled()` plus failure-or-cancelled). The AGENTS.md pointer is its own `## Repo map` section with `rm -rf arch && gh run download …` and a no-artifact fallback. `.gitignore` anchors `/arch/`. SECURITY.md, CONVENTIONS.md and the context ledger (AGENTS.md 9,663 → 9,835) are updated to match. touches: matches the diff. Refactors: none. Maintainability: the copy still diffs cleanly against natabula's deposit.

**Archived:** 2026-11-24
