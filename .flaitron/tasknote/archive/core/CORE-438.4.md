---
title: cursor-surface-integration
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438, CORE-438.3, CORE-438.5]
---

# CORE-438.4 | cursor-surface-integration

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]]

## 🎯 Goal

Propagate the shipped `cursor/` wiring bundle into every surface that already enumerates `codex/`, and flip the Cursor platform docs from stub/hypothetical to first-class.

## ✅ Acceptance

- [x] Every PLAN-named enumeration site that lists `codex/` (or platform siblings) also names the shipped `cursor/` thin bundle where a counterpart belongs
- [x] `docs/PLATFORMS.md` tree comment for `cursor/` reads shipped (not hypothetical); Today's-surface / installed-surface prose no longer classifies Cursor as contract-only-only
- [x] `docs/AGENT-COMPAT.md` Cursor row no longer says "no flowtron bundle"; Consume mode + Skill/command primitive reflect the thin `cursor/` wiring (Last verified stays `unverified` until [[CORE-438.5]])
- [x] `tools/update-adopters.mjs` registers a Cursor `WIRING_SURFACES` entry; suite still passes
- [x] `ft-update` Step 4 / 4.6 / 5 and `ft-release` §7.1 gain Cursor wiring checks appropriate to the thin bundle (no `cursor/skills/` inventory)
- [x] `ft-new-project` and `docs/MIGRATION.md` point Cursor-only adopters at `cursor/AGENTS-snippet.md`
- [x] `.gitignore` ignores `.cursor/` and its comment matches the ignored set
- [x] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"
- [x] VERSION-HISTORY — N/A: release-gated per its Maintenance rule; no hand-edit (deferred to `/ft-release` when Cursor ships in a cut)

## 🧩 Subtasks

- [x] Docs/layout: README, SPEC.md repo-layout, AGENTS.md (layout + Platform Notes), SECURITY.md, tasknote README AI-referenced list, SPEC/procedures/README.md pointer examples
- [x] Platform docs: PLATFORMS.md (tree comment, Today's surface, installed-surface, Cursor section lede + worked example — leave trigger table to `.5`), AGENT-COMPAT.md Cursor row, AGENT-NEUTRALITY.md wiring-layer list, MIGRATION.md Cursor install path
- [x] VERSION-HISTORY: confirm release-gated (no hand-edit); note deferred to `/ft-release`
- [x] Skills: `ft-new-project` Cursor-only branch; `ft-update` Cursor surface; `ft-release` §7.1 Cursor thin-bundle parity check
- [x] Fleet updater: add Cursor `WIRING_SURFACES` entry; run suite
- [x] `.gitignore`: add `.cursor/`; fix comment
- [x] Phase 3 verification + Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-438]] — parent epic (cursor-wiring)
- [[CORE-438.3]] — predecessor: shipped the `cursor/` wiring bundle
- [[CORE-438.5]] — follow-up: Cursor dogfood + PLATFORMS trigger table + dogfood-gate enrolment

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `cursor/` shipped in [[CORE-438.3]] and is still unregistered across the ~16 enumeration sites `.1` inventoried. Scope is mechanical propagation of a known thin-bundle shape; the named PLATFORMS tree-comment + AGENT-COMPAT clause flips are still stale at HEAD. No Re-scope/De-scope signal.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

PLAN.md line, `cursor/AGENTS-snippet.md`, archived [[CORE-438.1]] / [[CORE-438.2]] / [[CORE-438.3]], `docs/PLATFORMS.md` (Today's surface + tree + Cursor stub), `docs/AGENT-COMPAT.md` Cursor row, `tools/update-adopters.mjs` `WIRING_SURFACES`, `claude/skills/{ft-update,ft-release,ft-new-project}/SKILL.md`, README / SPEC.md / AGENTS.md / SECURITY.md / tasknote README / MIGRATION / AGENT-NEUTRALITY / VERSION-HISTORY / SPEC/procedures/README / `.gitignore`. Site list is known from `.1` — no probe needed.

### What upstream children locked (inherit, don't re-decide)

| Decision | Source | Effect on `.4` |
|---|---|---|
| Bundle is **thin**: snippet + procedure pointer, no `cursor/skills/` | [[CORE-438.1]] | Enumeration text must say thin, not "full wrappers like Codex" |
| Cursor-only install wires `claude/skills/` bodies into `.cursor/skills/` | [[CORE-438.2]] / [[CORE-438.3]] | Updater + `ft-update` flag/wire that surface; §7.1 parity is slug parity against the Cursor-only `ln -s` block, not a `cursor/skills/` inventory |
| PLATFORMS trigger table + dogfood stamp + gate enrolment | [[CORE-438.5]] | `.4` flips tree comment + surface classification; leaves stub→trigger-table replacement to `.5` |
| Fleet updater does not read `cursor/` today | [[CORE-438.3]] Testing Notes | Registering the third `WIRING_SURFACES` entry is this task |

### Enumeration sites (from [[CORE-438.1]] + PLAN)

| Site | Current gap |
|---|---|
| `README.md` | `cursor/` folded into grok "future" clause |
| `SPEC.md` §repo layout | same — future-platform clause, no `cursor/` bullet |
| `AGENTS.md` layout + Platform Notes | no `cursor/` bullet; Platform Notes stop at grok |
| `SECURITY.md` | Codex wrappers named; Cursor thin surface unnamed |
| `.flowtron/tasknote/README.md` AI-referenced | `claude/` + `codex/` snippets only |
| `docs/MIGRATION.md` | Codex install path; no Cursor-only path |
| `docs/PLATFORMS.md` | tree `:132` "hypothetical"; Today's surface lumps Cursor as contract-only; stub at `:370` |
| `docs/AGENT-COMPAT.md:39` | "Native primitive exists; no flowtron bundle" |
| `docs/AGENT-NEUTRALITY.md` | wiring-layer list is `claude/`, `codex/`, `grok/` |
| `docs/VERSION-HISTORY.md` | release-gated per its Maintenance rule — **no hand-edit** |
| `claude/AGENTS-snippet.md` | Codex verify sentence; no Cursor sibling pointer |
| `claude/skills/ft-release/SKILL.md` §7.1 | Claude/Codex only |
| `claude/skills/ft-update/SKILL.md` | Claude/Codex only |
| `claude/skills/ft-new-project/SKILL.md` | Claude wiring only (mentions Cursor as a consumer, not an install path) |
| `SPEC/procedures/README.md` | pointer examples: grok + codex only |
| `tools/update-adopters.mjs` | `WIRING_SURFACES` length 2 |
| `.gitignore` | comment claims Cursor; ignores only `.claude/` + `.agents/` |

### Drift check

- `cursor/` **exists** (two files) — `.3` delivered; this task documents it.
- PLATFORMS tree still "hypothetical Cursor wiring"; AGENT-COMPAT still "no flowtron bundle" — both named PLAN deliverables, still stale at Discovery start.
- Cursor stub still "Contract-only…" — first clause becomes false once surfaces flip; second clause stays true until `.5`. Update the stub lede so it doesn't re-assert contract-only; leave trigger-table body to `.5`.
- `VERSION-HISTORY.md` Maintenance forbids hand-editing current/historical entries outside `/ft-release` — treat the PLAN cite as "ensure no contradictory claim"; no new entry until the cut that ships Cursor.
- No SPEC *semantic* change — only the repo-layout bullet (same treatment `codex/`/`grok/` already have). Neutrality posture preserved.
- No archived factual claim falsified beyond the known-stale surfaces `.1`/`.3` already tracked for this task.

### Best Practices Review

Touched boundary is documentation + adopter tooling that *enumerates* wiring platforms. Dependency direction stays one-way: docs/skills may name `cursor/`; contract semantics do not grow Cursor-specific terms. Duplication risk: restating the install `ln -s` list — point at `cursor/AGENTS-snippet.md` / `claude/AGENTS-snippet.md` instead. Updater Cursor surface keys off the snippet's existing `claude/skills/` `ln -s` targets (thin bundle has no `cursor/skills/`), so new Claude skills flag Cursor-only adopters without inventing a parallel inventory. No refactor of `claude/` or `codex/` bodies.

### Clarifications

No clarifications needed. Explicit assumptions:

1. Thin-bundle wording everywhere (not Codex-style full wrappers).
2. AGENT-COMPAT Last verified stays `unverified` until `.5`.
3. PLATFORMS trigger table replacement is `.5`; `.4` only fixes classification + tree comment + stub lede consistency.
4. VERSION-HISTORY entry deferred to `/ft-release` per that doc's Maintenance rule.
5. Cursor `WIRING_SURFACES` watches `claude/skills/` adds against keys parsed from `cursor/AGENTS-snippet.md` (Cursor-only block).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the existing platform-enumeration shape: wherever `codex/` (or `claude/`/`grok/`) is named as a shipped wiring sibling, add a `cursor/` thin-bundle counterpart. Updater `WIRING_SURFACES` gained a third entry mirroring Codex's structure but keyed to `claude/skills/` adds + `cursor/AGENTS-snippet.md` keys (thin bundle has no `cursor/skills/`). §7.1 gained a fourth installed-surface `diff`/`grep` pair against the Cursor-only `ln -s` block — same adopter-subset expected set, no parallel inventory invent. No new abstraction.

**Minimal refactor gate.** No refactor. Existing Claude/Codex surfaces untouched beyond additive Cursor mentions. Deferred: VERSION-HISTORY entry (release-gated), PLATFORMS trigger table + dogfood stamp (`.5`).

**Deliverables (16 tracked paths + archive/PLAN):** layout bullets (README, SPEC, AGENTS, SECURITY, procedures README, tasknote README), platform docs (PLATFORMS, AGENT-COMPAT, AGENT-NEUTRALITY, MIGRATION), skills (`ft-new-project`, `ft-update`, `ft-release`), `claude/AGENTS-snippet.md` verify sentence, `tools/update-adopters.mjs` third surface, `.gitignore` `.cursor/`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34/34 pass**

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` + `node --check tools/update-adopters.test.mjs` clean; markdown N/A for typed lint. Analogous: Cursor §7.1 parity `diff` exit 0 (11/11); forbidden-install `grep` exit 1 (empty)

- [x] **Quality assertions** — no avoidable duplication (install commands referenced, not copied); no dead code; Cursor surface does not invent `cursor/skills/`; no unnecessary public surface; doc claims match thin-bundle reality

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface

**Testing Notes:**

| Check | Result |
|---|---|
| `update-adopters` suite | 34/34 pass |
| `node --check` updater + test | clean |
| Cursor adopter-subset parity (`ft-release` §7.1 shape) | 11/11 identical |
| Cursor forbidden-install grep | empty (exit 1) |
| Stale phrases `hypothetical Cursor` / Cursor `no flowtron bundle` | cleared (remaining `no flowtron bundle` hits are Gemini/Aider/Amp only) |
| `.cursor/` absent from checkout | confirmed — ignore rule only |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Propagated the shipped thin `cursor/` bundle across every enumeration / adopter / release surface that already named `codex/`, flipping PLATFORMS + AGENT-COMPAT from stub/hypothetical to first-class thin wiring, and registering Cursor in the fleet updater + `ft-update` / `ft-release` guardrails. Trigger-table dogfood and VERSION-HISTORY entry remain for `.5` / `/ft-release`.

**Archived:** 2026-08-12

### Doc-drift sweep

| Entry | Verdict |
|---|---|
| `README.md` | **updated** — `cursor/` repo-layout bullet |
| `SPEC.md` | **updated** — repo-layout `cursor/` bullet (no contract semantics) |
| `docs/MIGRATION.md` | **updated** — Cursor install + verify paths; fleet-updater flag wording |
| `claude/AGENTS-snippet.md` | **updated** — Cursor verify sentence |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | **added to AI-referenced list** (this task) |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | **updated** — Cursor thin surface in threat-model intro |
| `docs/AGENT-NEUTRALITY.md` | **updated** — wiring-layer list + MIGRATION ledger row |
| `docs/PLATFORMS.md` | **updated** — tree, Today's surface, installed-surface, worked example, stub lede |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | **updated** — Cursor row Consume mode + primitive |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |
