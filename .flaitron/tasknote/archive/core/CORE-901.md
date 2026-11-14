---
title: arch-health-adoption
status: completed
tags: [ci, fleet-standard]
created: 2026-11-14
due:
related-tasks: [CORE-896]
touches:
  - .github/workflows/arch-health.yml
  - .gitignore
  - AGENTS.md
  - SECURITY.md
  - README.md
  - docs/CONVENTIONS.md
  - docs/CONTEXT-BUDGET.md
  - .flaitron/PLAN.md
---

# CORE-901 | arch-health-adoption

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-896]]

## 🎯 Goal

Adopt natabula's weekly, non-gating arch-health report in flaitron self-host: the workflow adapted to detect `viz/`, an ignored `arch/`, and the AGENTS.md repo-map pointer block.

## ✅ Acceptance

- [x] `.github/workflows/arch-health.yml` exists, triggers on `schedule` + `workflow_dispatch` only, detects `viz/` (and fails when it is missing) — `grep -q 'for d in viz' .github/workflows/arch-health.yml && ! grep -qE '^\s+(push|pull_request):' .github/workflows/arch-health.yml`
- [x] Every `uses:` is pinned to a 40-hex SHA with a version comment (SECURITY.md posture) — `! grep -E 'uses: ' .github/workflows/arch-health.yml | grep -vE '@[0-9a-f]{40} # v'`
- [x] Workflow parses as YAML — `ruby -ryaml -e 'YAML.load_file(".github/workflows/arch-health.yml")'`
- [x] The npm report step's script runs green on `viz/` locally with the pinned tools (dep-graph.json + knip.json parse) — local replay of the step → exit 0
- [x] `arch/` is ignored — `git check-ignore -q arch/x`
- [x] AGENTS.md carries the pointer block byte-identical to natabula's template — `tail -3 AGENTS.md | diff - ../natabula/templates/arch-health/agents-pointer.md`
- [x] SECURITY.md's CI section names `arch-health.yml` and its `issues: write` job — `grep -q 'arch-health.yml' SECURITY.md`
- [x] Drift checks stay green — `bash tools/drift-checks.sh`
- [ ] Live `workflow_dispatch` run — not met: needs the push, which needs an explicit operator go; run `gh workflow run arch-health.yml` after it

## 🧩 Subtasks

- [x] Copy natabula `configs/.github/workflows/arch-health.yml`; adapt detect step (`viz` only), lockfile list, node `24`, SHA pins; drop the uv/pydeps steps and `PYDEPS_VERSION`; note the adaptation in the header
- [x] Append the wave's ignore note + `arch/` to `.gitignore`
- [x] Append the `<!-- arch-health:start/end -->` block to the end of AGENTS.md
- [x] Add a SECURITY.md paragraph for the new workflow
- [x] Replay the npm step locally on `viz/`; run drift checks
- [x] Review fixes: hard-fail detect, kept-code note, README/CONVENTIONS listings, CONTEXT-BUDGET re-measure, SECURITY dispatch wording

## 🔗 Related

- [[CORE-896]] — precedent: flaitron owner row for a natabula wave it cannot reach
- natabula NAT-602.4 — the wave that filed this row; NAT-602.2 — the source workflow

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No `arch-health.yml`, `arch/` ignore, or pointer block exists here; root has no `package.json`/`pyproject.toml`, so the unchanged file would detect nothing.

- [x] Read relevant source files — natabula `configs/.github/workflows/arch-health.yml`, `templates/arch-health/agents-pointer.md`, `scripts/install-wave.sh` `recipe_spec arch-health` (ignore note text); flaitron `.gitignore`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `SECURITY.md` §CI posture, `viz/package.json`, `viz/tsconfig.json`.

- [x] **Best Practices Review** — `N/A`: config/workflow adoption, no module boundaries.

- [x] **Archive skim** — `archive/core/` (README table row `CORE-*`); `grep -l 'arch-health\|NAT-602'` → no hits. No prior tasknotes on this surface.

- [x] **Drift check** — PLAN line matches natabula NAT-602.4's filing. Drift found against the "copy" wording: (1) viz `engines` needs Node `^24.15 || >=26`, source pins `22`; (2) SECURITY.md promises full-length SHA pins, source uses tags; (3) no Python stack here. Settled by operator below.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — operator (2026-11-14): **SHA-pin** every action (checkout/setup-node reuse ci.yml's SHAs; upload-artifact v7 → v7.0.2 `cf430e03…`); **drop** the uv/pydeps steps; **node `24`** and **add a SECURITY.md paragraph**. Assumptions: no markers (public repo); no push.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- `viz/tsconfig.json` is a solution root (`files: []`, references only); `--ts-config tsconfig.json` still gives compilerOptions resolution and viz has no path aliases, so the graph should resolve. Verified by the local replay.
- Dependabot `github-actions` ecosystem covers `/` with PR limit 0 — SHA pins stay operator-bumped, same as ci.yml.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended natabula's wave recipe shape (file + ignore note + block, from `install-wave.sh` `recipe_spec arch-health`) and ci.yml's SHA-pin-with-version-comment style.

- [x] **Minimal refactor gate** — no refactor; the run script of the npm step is byte-identical to the source.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no repo test surface for workflows; the local replay of the detect + npm steps stands in.

**Implementation Notes:**

- Workflow copied from natabula HEAD (`git diff --quiet HEAD` on the source → clean), then four deltas, each named in the file header: detect loop `for d in viz` + `cache-dependency-path: viz/package-lock.json`; `node-version: '24'`; SHA pins (checkout `fbc6f399…` v5.1.0 and setup-node `24997072…` v6.5.0 reused from ci.yml; upload-artifact `cf430e03…` v7.0.2 via `gh api …/matching-refs/tags/v7`); uv/pydeps steps, `py` output and `PYDEPS_VERSION` dropped. The `report-failure` job is unchanged.
- `.gitignore` gets the wave's exact two-line note + `arch/`; AGENTS.md gets the template block appended at the end after a blank line.
- SECURITY.md §"GitHub Actions CI": one paragraph on triggers, pins, version-not-hash tool pins and the `issues: write` job.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — local replay of the workflow's detect + npm steps (extracted from the parsed YAML) on `viz/`

- [x] Ran lint/type-check on changed code — `N/A`: no viz source changed; YAML parse + drift checks cover the edited files

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (after review fixes):

```text
ruby -ryaml … YAML.load_file(arch-health.yml)          → 0
detect step replay (repo root)                          → 0, npm=viz
detect step replay (empty dir)                          → 1, ::error:: viz/ missing
npm map step replay, STACKS=viz, pinned tools           → 0; dep-graph 112 modules (100 .ts/.tsx), 1 unresolved (typescript-eslint in eslint.config.js); knip {"issues":[]}
grep triggers / for d in viz                            → 0
SHA-pin grep                                            → 0
git check-ignore -q arch/x                              → 0
tail -3 AGENTS.md | diff - natabula template            → 0
grep -q arch-health.yml SECURITY.md                     → 0
bash tools/drift-checks.sh                              → 0 (4 pre-existing NEAR CAP lines, none on touched files)
```

External review — `/code-review medium` over this task's working-tree diff (10 findings):

- Fixed: (2) soft detect could go green and empty → detect step now fails when `viz/` is missing; (3) unreachable root-stack branches → kept for diffability and named in the header; (4) README `.github/` entry + CONVENTIONS §"GitHub Actions CI" now list the workflow; (5) CONTEXT-BUDGET `AGENTS.md` row re-measured 8,671 → 9,071; (9) SECURITY.md no longer overstates — a dispatch on an unmerged branch runs that branch's code.
- Refuted by evidence: (1) the solution-root `tsconfig.json` drops viz's compilerOptions → the replay resolved every import but one config-file import; the graph is complete enough for a lower-bound map.
- Upstream, kept on purpose (natabula's file / wave bytes; diverging breaks the wave's byte-identity "current" check): (6) block's `pydeps` mention; (7) `cancel-in-progress: true` can cancel a scheduled run so its canary is lost; (8) checkout `persist-credentials` default; (10) unanchored `arch/` ignore line. Raised to the operator for natabula, not filed here.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: README `.github/` entry, docs/CONVENTIONS.md §"GitHub Actions CI", SECURITY.md §"GitHub Actions CI", docs/CONTEXT-BUDGET.md `AGENTS.md` row.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`; the pointer block itself is the always-loaded line this task adds.

**Final Summary:**

flaitron now carries natabula's weekly arch-health report, adapted to `viz/` (hard-fail detect, Node 24, SHA pins, no Python steps), with `arch/` ignored, the byte-identical AGENTS.md pointer block, and SECURITY/CONVENTIONS/README/CONTEXT-BUDGET updated. `touches:` widened at review by README, CONVENTIONS, CONTEXT-BUDGET (+ PLAN for closure); diff matches the declared set. No refactor. Open item: the live `workflow_dispatch` run waits on an operator-approved push.

**Archived:** 2026-11-14
