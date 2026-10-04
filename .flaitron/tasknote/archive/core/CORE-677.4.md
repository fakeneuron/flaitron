---
title: codex-grok-compare
status: completed
tags: []
created: 2026-10-01
due:
related-tasks: [CORE-EPIC-677, CORE-677.1, CORE-677.2, CORE-677.3, CORE-677.N]
touches:
  - docs/CODEX-VERIFICATION.md
blocked-by:
  - CORE-677.3
---

# CORE-677.4 | codex-grok-compare

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-677]]

## 🎯 Goal

Compare identical bounded completion and unattended-drift fixtures through Codex wrappers, a same-model/effort Codex SOP control, and Grok Build, preserving reproducible evidence and honest attribution limits.

## ✅ Acceptance

- [x] Two scenarios across three routes attempted with identical tracked fixture content per scenario, source revision, exact prompts, invocation provenance, configured model/effort, and command outcomes — `python3 /private/tmp/core677-compare/verify.py --resolved`.
- [x] Completion artifacts and gate/park stops checked independently of CLI exit, including source tests, tasknote receipts/review provenance, PLAN/archive placement and deliverable-covering closure SHA — same verifier plus `judgment` review of captured transcripts.
- [x] Durable comparison in docs/CODEX-VERIFICATION.md distinguishes within-Codex wiring observations from cross-provider confounding, failures/unavailable evidence, and dogfood qualification — `judgment`; no statistical model ranking or unsupported compatibility stamp.
- [x] Documentation checks and independent read-only review pass with all findings fixed or dispositioned — CI-extracted context/newline/citation checks, `git diff --check`, review receipt.

## 🧩 Subtasks

- [x] Read predecessor evidence and establish bounded fixture/launch controls.
- [x] Prepare two clean fixture baselines and execute six fresh isolated runs.
- [x] Verify raw outcomes and resolve only evidenced failures/uncertainties.
- [x] Record durable reproduction/results, review, sweep docs and close atomically.

## 🔗 Related

- [[CORE-EPIC-677]] — parent.
- [[CORE-677.1]] — bounded six-run protocol and sequential Fan-out.
- [[CORE-677.2]] — discovery/install evidence, distinct from execution.
- [[CORE-677.3]] — blocked-by; closed parity repair and reviewer-trace limitation.
- [[CORE-677.N]] — successor evidence/claim audit.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-677.3 is closed and both CLIs are installed; isolated comparison is the remaining filed deliverable.

- [x] Read relevant source files
- [x] **Best Practices Review** — reuse thin wrappers, canonical SOP/body and existing temporary-fixture pattern; no permanent runner or duplicated workflow implementation.
- [x] **Archive skim** — read CORE-677.1/.2/.3 in authoritative archive/core/; .1 sets the six-run bound, .2 separates discovery from execution, .3 requires honest reviewer provenance.
- [x] **Drift check** — source HEAD fdf1b1ca14b39abe18b1446803b97b8b18740cf1 includes .3 fixes; its final SOP hash will be captured in fixture manifests. PLAN dependency is satisfied. Grok installed CLI is 1.0.46, model catalog reports grok-4.7; this is run metadata, not a calibration refresh.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Entry tree clean, no active/archive collision. README table maps CORE-* to archive/core/. CORE-677.1 Fan-out declares sequential dependency on .3, echoed above. Heavy reasoning meets the task category; no retag.
- No clarifications needed. At most six initial cells: inclusive interval fix with existing meaningful tests and full closure; stale removed HTTP-service/deployment scope requiring unattended drift park. Same tracked baselines, Acceptance targets and mode per scenario. Codex routes explicitly share gpt-6.1-sol/high; Grok uses grok-4.7/high. Source-copy fixtures are not pinned-submodule installation evidence.
- Native Codex route invokes installed ft-task wrapper; Codex control explicitly reads the neutral SOP without repo skill wiring; Grok native route loads canonical Claude-compatible ft-task body. Differences in routes/skill discovery are recorded rather than erased. Cross-provider tools, prompts and permission controls remain confounders.
- Official OpenAI config reference fetched through Docs MCP confirms model_reasoning_effort is model/client dependent. Installed help supplies actual launch flags. No model generation, stamp refresh, real PLAN fixture or external write yet.
- Discovery surfaced no significant deviation; skip 🛠️. Comparison evidence only; separate report-only DOGFOOD is required only if compatibility refresh is undertaken.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extend predecessor's disposable fixture/receipt pattern, keeping helper scripts outside the repository.
- [x] **Minimal refactor gate** — N/A for documentation/evidence work; no shipped runtime or workflow-body refactor planned.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — existing independent four-case fixture tests and temporary artifact verification; no shipped code change.

**Implementation Notes:**

- Resume resolved quota with two fresh same-source/model/effort/prompt completion retries, CLI 0 each; source + PLAN + archive closure SHAs wrapper 5c828e4f8ff5f44e9ae3500c97315ff32f251b8d and SOP 0aceba9ede996b39a17312c1c6d87fd94a308765. All six intended artifact outcomes now have deciding evidence; originals remain preserved failures. Saved Codex exports lack identifiable reviewer spawn/results despite distinct canonical IDs recorded in notes; documented this limitation alongside stronger Grok reviewer trace. No compatibility refresh.

- Prepared two committed baselines from source fdf1b1ca14b39abe18b1446803b97b8b18740cf1, cloned each three times under /private/tmp/core677-compare. Per-scenario tracked tree hashes identical across routes: completion 9f18788dc74c58a71dd767d859e4f6fe1dedd3ee; drift 30567f2067ab16e7ca5724083b431d81f8293b8a. No fixture commit merged; no real PLAN fixture row.
- First-attempt observation (quota resolved below): six initial model-bearing runs attempted. All three unattended drift artifacts pass; Grok completion passes source/closure artifact checks with SHA 25d4b1b3ea7cacb8036116dbc078943bb6ea98ff. Both Codex completion turns failed during Discovery on account usage limit (CLI exit 1; provider said retry at 11:46 PM without date/timezone). At that park these were unfinished obligations, not workflow parity failures or completed Acceptance; the fresh retries above resolve them. Wrapper has an interrupted active in-progress fixture note; SOP fixture remains clean. Preserve those original artifacts.
- Outer-sandbox drift startup failed before generation; approved CLI retries retained child workspace sandbox/automatic review. No approval bypass or simulated gate response. Two startup failures are separate from six model-bearing cells.
- Grok inspect exposed global ft-task and projectTrusted false, so its prompts explicitly source the local canonical body. Actual local read_file calls captured. This is a conversational canonical-body baseline, not native project discovery. Runtime modelUsage reports grok-4.7-build for the configured grok-4.7 argument; reviewer model unavailable.
- Grok completion captures a real distinct review result, reviewer 01a0fa2c-6cdd-70d2-b9e0-5d9573dd4afd, no blockers and redundant reversed-guard note fixed before closure. Raw result supports review context provenance but not the reviewer's own model/full transcript. Grok cue/order deviations remain qualified in the doc; a single run does not justify source patching or rankings.
- First-attempt documentation checkpoint: docs/CODEX-VERIFICATION.md recorded partial controls, exact prompts/commands, baseline trees, session IDs, model/effort, native counters, failure and closure receipts, review result, attribution limits and resume obligation; the later successful-retry section resolves that checkpoint. Compatibility stamps unchanged; no qualifying report-only DOGFOOD attempted.
- During Execution, `python3 /private/tmp/core677-compare/verify.py` → 1: two quota-interrupted completion cells fail; remaining four artifact outcomes pass. This is fixture evidence collection, not completed parent Phase 3. Temporary helper compilation and `git diff --check` ran before the dependency was confirmed; final documentation/independent review/doc sweep remain pending.

### First-attempt quota handoff (resolved)

The first attempt parked on the Codex CLI account quota dependency. PLAN row stays unchecked and unchanged. No Phase 3/4, archive move, closure commit or landed marker for CORE-677.4. The evidence doc and this park are uncommitted working-tree progress; preserve both. Before a fresh skill re-entry, the entry foreign-dirt rule still applies; an operator can commit/stash this checkpoint, or continue conversationally in this session once quota is available. The operator resumed conversationally; this is the existing task session, not a fresh skill entry over foreign dirt.

Resume Phase 2 without repeating Discovery. Re-check original raw artifacts and source snapshot. Leave failed completion repositories/receipts intact; create two fresh completion clones from /private/tmp/core677-compare/baseline-completion, remove clone remotes, retain the same source/model/effort/mode and exact common prompt, wire only the wrapper clone's ignored ft-task link, and label retries distinctly. The original six cells retain their outcomes; only the two quota failures need a retry. Do not switch model, edit fixture core, restart over the interrupted note, or claim the parent model as the CLI control. If source or launch controls change, explicitly record that the original control comparison no longer holds.

Temporary setup.py/run.py/verify.py, source.tar, original manifests/prompts/JSONL/stderr/inspect data and fixture repositories live under /private/tmp/core677-compare. The verifier initially expects original cell paths; extend its input labeling for fresh retries while keeping original receipts. Final document should include original failures plus new receipts, actual closure paths/SHAs and reviewer context/results where supplied. Then run narrow documentation checks and independent read-only parent review; finish per-entry doc sweep, Acceptance tick-through, own nested PLAN stub/archive and atomic deliverable closure commit. CORE-677.N follows only after this child actually closes. No new follow-up row is needed for an unfinished parked task: this row still owns the work.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — temporary fixture artifact verifier plus independent source-test reruns; shipped production code unchanged.
- [x] Ran lint/type-check on changed code — docs context/newline/citation/whitespace checks; temporary helper compilation. Product lint/typecheck N/A.
- [x] **Verification receipt**
- [x] **External review**
- [x] (frontend) Visual confirmation — N/A; no rendered surface.

**Testing Notes:**

- Required independent read-only parent review `/root/comparison_review` → no blockers, two notes. The reviewer read actual trees/hashes/prompts/receipts/commits/cues and ran only read-only whitespace checking; it did not write or run the report-producing verifier. Note 1: Grok's brief forbids writes but permits and runs ordinary unittest/py_compile, which can produce bytecode. Fixed by qualifying the requested read-only description and citing the captured reviewer command; distinct reviewer provenance remains supported. Note 2: historical partial/quota Implementation Notes could read as current open obligations. Fixed by labeling those first-attempt observations and pointing at completed retries. Both fixes are evidence wording, not workflow source changes. Follow-up independent read-only review returned no blockers or notes. Parent review actual tool messages/results are in this conversation; no author claim substitutes for them.

- Final verifier --resolved → 0; original completion failures stay FAIL with captured quota errors, exact retry controls checked, and all six intended resolved artifact outcomes PASS. All three completion source unittest/compile commands → 0, actual atomic commits/clean trees/archive/YAML/date/Acceptance/PLAN checked. No avoidable runtime/code duplication or new public surface: deliverable is evidence Markdown; fixtures reuse independent existing cases.
- Documentation context/newline/citation and whitespace checks each → 0, recorded per command in /private/tmp/core677-compare/documentation-checks.json. Temporary helper py_compile → 0. Product visualizer/fleet validation N/A — neither product nor updater code changed.

- Both fresh retries finished. Full artifact resolution verifier `python3 /private/tmp/core677-compare/verify.py --resolved` → 0; interim run while SOP driver had not written its receipt exited 1 with FileNotFoundError. Re-run only after driver completion. Parent Phase 3 now runs narrow documentation/evidence checks and the required independent review.

- Resume: confirmed parent source HEAD remains fdf1b1ca14b39abe18b1446803b97b8b18740cf1, only the prior doc and tasknote progress are dirty, and PLAN dependencies/collisions are unchanged. Cleared dependency park-reason and returned to Phase 2 without rerunning Discovery. Fresh wrapper-completion-retry and sop-completion-retry clones retain original baseline tree/prompt hashes and gpt-6.1-sol/high/workspace-auto-review launch controls. Originals preserved.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**
- [x] Closed
- [x] **Evidence-based recap** drafted
- [x] **Learnings**

**Final Summary:**

Compared two bounded scenarios across three routes at a fixed source snapshot. All six intended source/lifecycle artifact outcomes now have deciding evidence after two quota retries, with original failures and cue/reviewer limits preserved rather than converted into model rankings.

- Deliverable: docs/CODEX-VERIFICATION.md extends dated installation/parity evidence with shared fixture trees, exact prompts/launches, source/version/model/effort, session IDs, tests, parks, closure SHAs, native counters, captured Grok review, reproducibility and attribution limits. No production/workflow source change, model calibration update or compatibility stamp refresh.
- Verification: original verifier → 1 on two quota-interrupted completion cells; --resolved → 0 requiring preserved quota errors plus fresh exact-control retries. Three drift parks and three completions pass artifact checks; source tests/compilation pass for each completion. Context/newline/Pair Q/whitespace checks and temporary-helper compilation → 0. Product visualizer/fleet checks N/A — those surfaces are unchanged.
- Refactor: N/A for evidence Markdown. Reused thin wrapper/SOP/canonical-body instructions and independent existing test cases; no shipped runner, permanent validator, duplicated workflow body or new public API.
- Scope reconciliation: declared one deliverable path, changed exactly docs/CODEX-VERIFICATION.md. Undeclared: none. Own PLAN/tasknote lifecycle writes excluded; ignored temp fixtures/scripts/receipts are not git deliverables. Maintainability effect: future agents can distinguish discovered wiring, executed routes, interrupted runs, and report-only stamp authority from a durable comparison receipt.
- Deferred steps: none. CORE-677.N already owns evidence/claim audit and the recorded cue/reviewer-trace limits; no correction to a proven source defect or real-world operator action is deferred. No archived factual claim was falsified and no superseded pointer is needed.

### Doc-drift sweep

| Document | Verdict |
|---|---|
| `README.md` | no change — overview links and compatibility currency authority remain accurate |
| `AGENTS.md` | no change — validation/lifecycle/layout/model guidance unchanged |
| `SPEC.md` | no change — comparison observes existing contract; no conformance rule changed |
| `docs/MIGRATION.md` | no change — existing dated installation receipt and canonical wiring policy remain accurate |
| `claude/AGENTS-snippet.md` | no change — canonical roster/adopter block unchanged |
| `codex/AGENTS-snippet.md` | no change — existing verification link now includes comparison; wiring/invocation rules unchanged |
| `cursor/AGENTS-snippet.md` | no change — no Cursor evidence or wiring change |
| `grok/AGENTS-snippet.md` | no change — native discovery limitation is explicitly confined to untrusted disposable folders; no universal wiring claim inferred |
| `docs/CONVENTIONS.md` | no change — no validation/commit/release convention change |
| `CONTRIBUTING.md` | no change — contribution/remit unchanged |
| `SECURITY.md` | no change — child sandboxes/approval controls preserved; no policy alteration |
| `docs/AGENT-NEUTRALITY.md` | no change — wrapper/SOP/shared-fragment dependency remains unchanged |
| `docs/PLATFORMS.md` | no change — verification link remains accurate; dated dogfood/calibration claims untouched |
| `claude/CAPABILITIES.md` | no change — no Claude capability or new stamp observation |
| `docs/AGENT-COMPAT.md` | no change — no qualifying report-only DOGFOOD receipt, stamps preserved |
| `docs/EXTERNAL-AGENTS.md` | no change — lifecycle handoff, stable surfaces and park controls unchanged |
| `docs/WORKTREES.md` | no change — disposable clones are comparison fixtures, not a change to epic parallel-work conventions |
| `docs/VISION.md` | no change — no workflow runtime/schema/validator or scope extension introduced |

**Learnings:** N/A — durable dated evidence belongs in docs/CODEX-VERIFICATION.md; no new always-loaded project rule.

**Closure review:** Only CORE-677.4 becomes its nested checked stub under the active Medium epic. Archive destination .flowtron/tasknote/archive/core/CORE-677.4.md; no parent or sibling completion flip. Stage evidence doc plus own PLAN row and archive together. Proposed atomic message: `docs: CORE-677.4 — compare workflow routes`. Independent review passed; all Acceptance criteria satisfied and mechanical status/date/tick-through guards run before archive. Commit the evidence and lifecycle records atomically; no push.

**Archived:** 2026-10-02
