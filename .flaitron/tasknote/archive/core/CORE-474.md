---
title: readme-unattended-bullet
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-473.N]
touches:
  - README.md
---

# CORE-474 | readme-unattended-bullet

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-473.N]]

## 🎯 Goal

Add an `--unattended` bullet to README §"Sessions, loops, and sub-agents", parallel to the existing `--fast` bullet, drawing the operator-present vs nobody-present distinction.

## ✅ Acceptance

- [ ] README §"Sessions, loops, and sub-agents" has a bullet for `--unattended` alongside the existing `--fast` bullet
- [ ] The new bullet draws the operator-present (`--fast`) vs nobody-present (`--unattended`) distinction, consistent with SPEC/gates.md §"`--unattended` operator posture"

## 🧩 Subtasks

- [ ] Add an `--unattended` bullet to README §"Sessions, loops, and sub-agents", immediately after the `--fast` bullet
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-473.N]] — predecessor (audit doc-drift sweep that surfaced this gap)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** README §"Sessions, loops, and sub-agents" (README.md:236-239) still shows only the `--fast` bullet, confirmed live and unchanged since CORE-473.N filed this follow-up.

- [x] Read relevant source files — read README.md §"Sessions, loops, and sub-agents" (lines 218-260) and SPEC/gates.md §"`--unattended` operator posture" (lines 437-467) for the operator-present vs nobody-present contract to summarize.

- [x] **Best Practices Review** — N/A: single new bullet in an existing bulleted list, matching the exact voice/length/link style of the sibling `--fast` bullet immediately above it. No refactor.

- [x] **Archive skim** — CORE-473.N.md (the audit that filed this task) explicitly names the gap and the fix: add a bullet stating `--fast` = "don't ask me" with an operator present, `--unattended` = nobody there at all, closing with the same contract-not-runtime framing the section already uses. No other archived tasknote touches this README section.

- [x] **Drift check** — PLAN.md line and CORE-473.N's finding agree with current README/SPEC content; no drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: new bullet is inserted immediately after the existing `--fast` bullet (README.md:236-239), in the same list, matching its bullet-lead-bold-phrase style.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

CORE-473.N (archived) is the source of this follow-up and already specifies the content: the `--fast` bullet's "sanctioned hands-off mode" framing needs a sibling `--unattended` bullet drawing the operator-present vs nobody-present line, per SPEC/gates.md §"`--unattended` operator posture" ("declares something `--fast` never claims: that no operator is present to answer a gate... a strict superset of `--fast`"). Small, single-file, non-code doc addition — no test/lint surface beyond a markdown read-through.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the existing bullet shape exactly (bold lead phrase, sentence-case body, trailing citation link where the sibling bullets carry one).

- [x] **Minimal refactor gate** — N/A. Single bullet insertion; no existing content touched or restructured.

- [x] Implemented the minimal solution — added the `--unattended` bullet to README.md §"Sessions, loops, and sub-agents" immediately after the `--fast` bullet (README.md:236-247), citing `SPEC/gates.md` §"`--unattended` operator posture" and echoing the section's existing contract-not-runtime closing line.

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc change.

**Implementation Notes:**

One bullet added; no other content changed. Content and citation verified against SPEC/gates.md §"`--unattended` operator posture" (park-vs-fire semantics, "strict superset of `--fast`") during Discovery.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no test suite covers README prose.

- [x] Ran lint/type-check on changed code — N/A (markdown); verified the linked file (`SPEC/gates.md`) exists and the cited heading (§"`--unattended` operator posture") is present.

- [x] **Quality assertions** — no duplication (new bullet, no restructuring), no dead code, wording matches the section's established voice and citation style, content verified against SPEC/gates.md rather than paraphrased from memory.

- [x] (frontend) Asked the user for visual confirmation — N/A, non-frontend doc change.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Read the rendered section end-to-end (README.md:218-270) to confirm the new bullet fits the surrounding prose and the section's closing "runtime lives in the runner; the contract lives in flowtron" framing still lands cleanly after it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: **updated** (this task's deliverable — new `--unattended` bullet). `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`: no change — out of scope, none reference this README bullet.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote moved to archive.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Added a `--unattended` bullet to `README.md` §"Sessions, loops, and sub-agents" (README.md:236-247), immediately after the existing `--fast` bullet, drawing the operator-present (`--fast`) vs nobody-present (`--unattended`) distinction and citing `SPEC/gates.md` §"`--unattended` operator posture". +10/-0 lines, one file. Closes the gap CORE-473.N's audit deferred as follow-up F4. Verification: read-through confirmed link target and heading exist, and wording matches sibling bullet style. No tests/lint apply (prose-only). No refactor. Doc-drift sweep: only README.md needed the update; no other ledger entry affected.

**Archived:** 2026-08-25
