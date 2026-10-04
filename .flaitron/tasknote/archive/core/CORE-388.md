---
title: skill-roster-utility-review
status: completed
tags: []
created: 2026-07-31
due:
related-tasks: [CORE-386, CORE-387]
---

# CORE-388 | skill-roster-utility-review

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-386]] [[CORE-387]]

## 🎯 Goal

Deliver a keep / merge / cut verdict with rationale for each of the 25 shipped skills, testing whether the roster earns its size — with particular scrutiny on the seven task-entry skills and the eight `ft-audit-*` scaffolds.

## ✅ Acceptance

- [ ] Every shipped skill (26, not the filed 25 — see drift check) has an explicit keep / merge / cut verdict with rationale recorded in this tasknote
- [ ] The two named clusters (7 task-entry skills; 8 `ft-audit-*` skills) each get a cluster-level structural verdict grounded in archive precedent (CORE-072 / CORE-101 / CORE-287 / CORE-289 / CORE-042.5 / CORE-330.4)
- [ ] Verdicts cite evidence — SKILL line counts, SPEC carve-outs accreted per skill, overlap analysis, install-tier differences — not vibes
- [ ] Follow-up work implied by merge/cut verdicts is filed as PLAN.md entries at closure; no rewrites executed in this task
- [ ] The 25→26 roster-count drift in the CORE-386 / CORE-387 PLAN lines is reconciled

## 🧩 Subtasks

- [ ] Build the roster inventory: all 26 skills with purpose, invocation trigger, size, install tier (bundled / forked / global / by-reference), and SPEC dependencies
- [ ] Cluster (a) — seven task-entry skills: overlap matrix; separate lifecycle-real distinctions (status-enum changes) from ceremony-only ones; judge merge candidates against the CORE-042.5 "user picks entry point" precedent
- [ ] Cluster (b) — eight `ft-audit-*` skills: measure the actual delta between the six forked scaffolds; evaluate one-parameterized-skill + pass-library against the CORE-287 thin-overlay precedent and the two-project rule
- [ ] Remaining 11 skills: individual keep/merge/cut verdicts
- [ ] Compose the full verdict table with rationale into this tasknote
- [ ] File follow-up PLAN entries per verdicts; reconcile the 25→26 count drift in sibling PLAN lines

## 🔗 Related

- [[CORE-386]] — skill-rationalizations-redflags; coordinates with this review so new sections aren't written into skills consolidation may remove
- [[CORE-387]] — cross-artifact-consistency; extension-first candidate that may fold into surfaces this review evaluates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Roster pressure is real and current — CORE-386/387 both hedge against this review's outcome, so the verdict unblocks two open tasks. Operator confirmed standalone-review scope (no epic promotion; consolidation work files as follow-ups) and tasknote-only deliverable.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A` for code boundaries: this is an analysis task whose deliverable is a verdict record in the tasknote plus PLAN.md filings; no source modules are edited.

- [x] **Archive skim** — extensive; findings in Discovery Notes below.

- [x] **Drift check** — three deviations from the task line: (1) the roster is **26 skills, not 25** (SPEC.md §"Skill namespace" enumerates 26; `claude/skills/` has 26 dirs) — CORE-386/387 lines carry the same stale count; (2) "Eight `ft-audit-*` skills each self-described as a stack-neutral scaffold adopters fork" is imprecise — only **six** are forked scaffolds; `ft-audit-repo` is run-by-reference (no fork, CORE-309) and `ft-audit-context` is a global install with a deliberately different shape (CORE-186); (3) `SPEC/tasknote-selection.md` = 235 lines confirmed exact. Seven task-entry skills confirmed. None of these change the task's thrust; counts corrected in the verdict.

- [x] Asked clarifying questions — two AskUserQuestion asks, both resolved to the recommended default: **standalone review** (not epic promotion) and **tasknote-only deliverable** (no committed doc).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Roster ground truth:** 26 skills, 3,825 SKILL.md lines total. Largest: ft-release (399), ft-epic-discovery (253), ft-close-epic (210). The 8 audit skills are the smallest (85–108 each).
- **Audit family history:** the family *started* as a consolidation — CORE-072 merged InvisiPaw's audit-backend + audit-frontend into ONE stack-neutral 5-pass scaffold. CORE-101 re-expanded to six (no tasknote survives; commit `ba6ba8d`; rationale "same §0–§6 skeleton so adopters fork once, learn once"). CORE-186 (context) and CORE-309 (repo) joined with deliberately different shapes/install tiers. CORE-289 capped growth: rejected -api/-database/-e2e on the two-project-precedent rule. CORE-287's thin-overlay template ("run scaffold by reference + `## Deltas` block") already prototypes one-parameterized-skill at the adopter layer. CORE-185 documents the carrying cost: one pass-name drift took 18 edits across 7 files.
- **Entry family history:** CORE-042.5 is the load-bearing precedent — explicitly rejected `[micro]` PLAN-line routing and a 5-way ft-task branch: "user picks the entry point at invocation time." ft-starter-task is the only entry skill that changed the status enum (CORE-027) and is already half-merged into ft-task (promote branch). ft-debug (CORE-195) and ft-goal-task (CORE-330.4) are "specialized drivers, not forks; ~90% identical to /ft-task" by design. ft-file-followup's differentiator is conversational-only output (CORE-057.5); ft-sidequest has **no tasknote at all** (commit `8747539`) and its "lightest" claim overlaps ft-file-followup's identical claim.
- **Prior confusion signals:** CORE-328.3 found the 7 forked-audit descriptions were the single systematic dispatch failure (zero "use when" framing; fixed cosmetically); the entry family passed as "mutually differentiated by scenario." CORE-042.5's "revisit if discoverability becomes an issue" was never revisited. No archived tasknote ever flagged total roster size — CORE-386/387/388 are the first.
- **Selection doc:** CORE-223.3 created `SPEC/tasknote-selection.md` for token-budget reasons only (SPEC.md size cap), not because selection complexity was judged healthy; it's load-bearing for every entry skill (23 §-refs across 14 files at split time) and has since grown blocks for sidequest + spec.
- **Baseline caveat for the spec-kit comparison:** spec-kit's ~8 commands ship to a broad audience; flowtron's 26 include self-only tooling (ft-release), fleet tooling (ft-update, ft-new-project), and forked templates — the honest comparison is per-install-tier, not raw count.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` for code shape (analysis task); the review method itself follows precedent: verdicts grounded in archive decisions + measured evidence, per the CORE-289 keep/reject style.

- [x] **Minimal refactor gate** — `N/A`; no source edits in this task by design (verdict-only).

- [x] Implemented the minimal solution — verdict table below.

- [x] Updated/added tests for non-trivial behavior — `N/A`; no code changed.

**Implementation Notes:**

### Method

Full reads: all 7 entry-family SKILLs, `ft-audit` + `ft-audit-backend` (with pairwise diffs across the six forked scaffolds), `SPEC/tasknote-selection.md`, MIGRATION install tiers, adopter symlink list. Archive evidence via targeted skim (CORE-027/042/057/072/101/185/186/195/223/287/289/309/328/330).

### Measured facts

- Pairwise diff between forked audit scaffolds: ~65–76 differing lines of ~91 — but §§3–6 (finding format, closing sections, PLAN-write step, trivial-fix carve-out, hard rules) are near-verbatim; the genuine per-skill content is the five pass definitions + severity examples, ~30 lines each.
- `ft-debug` restates `/ft-task` by reference in ~100 of its 149 lines ("identical to /ft-task" ×7 section headers); its whole delta is four Phase-1 prompts + one Phase-3 re-verify rule. `ft-goal-task` shares the skeleton but carries a genuinely different execution model (gate collapse, loop body, verify-command rule, `--worktree` handoff, `SPEC/loop.md`).
- Install tiers: 13 per-project symlinks, 6 forked audit scaffolds, 7 globals (2 also symlinked), 1 self-only. No adopter surface ever shows all 26.
- `ft-sidequest` and `ft-file-followup` both self-describe as the "lightest" filing motion (CORE-057.5 vs the sidequest SPEC block); sidequest writes *more* to disk (a stub file) yet is labeled lighter — the overlap the selection doc spends its longest block disambiguating.

### Verdict table (26 skills)

| # | Skill | Verdict | Rationale |
|---|---|---|---|
| 1 | ft-task | **KEEP** | Core runner; every other entry skill is defined relative to it. |
| 2 | ft-micro-task | **KEEP** | Distinct template + one-shot closure contract; highest-frequency light runner on the board. Merging would add the size-detection branch CORE-042.5 explicitly rejected. |
| 3 | ft-debug | **MERGE** → `/ft-task --debug` | Zero mechanical delta: four Phase-1 prompts + one Phase-3 re-verify obligation, portable as a lazy SKILL fragment (pattern exists: `step-1.5-model-edge.md`). CORE-042.5 rejected *auto-routing*, not flags — a flag preserves "user picks the entry point." Cost: weaker NL dispatch ("debug this bug" → separate skill matches better); judged worth one roster slot + one fewer skeleton restatement to drift. |
| 4 | ft-goal-task | **KEEP** | Largest genuine delta in the family — inline Phase 2↔3 loop, gate collapse, verify-command rule, `SPEC/loop.md`, `--worktree`. As a flag it would roughly double ft-task's SKILL. |
| 5 | ft-starter-task | **KEEP** | Only filer that creates a lifecycle state (`status: starter`, CORE-027); its promotion path is already integrated into ft-task Step 3a. |
| 6 | ft-file-followup | **KEEP** (absorbs sidequest) | Canonical mid-flow filer: review gate + reconcile scan; clear ≤50w niche. |
| 7 | ft-sidequest | **MERGE** → `/ft-file-followup --park` | Only skill in the roster with no Discovery record (ad-hoc commit `8747539`); its "lightest" claim collides head-on with file-followup's (CORE-057.5). Distinct behavior (priority flags, stub + resume anchor, no-gate ≤70w reply, resume-inline contract) ports intact as a mode. |
| 8 | ft-epic-discovery | **KEEP** | Epic filing entry; distinct deliverable (parent + child cohort + driven .1). |
| 9 | ft-close-epic | **KEEP** | Closure symmetric of epic-discovery; parent-flip + atomic cohort move don't fit ft-task's per-task closure. |
| 10 | ft-spec | **KEEP** | Planning peer that never files; fills the pre-filing design gap; dogfood-validated (CORE-352.5). |
| 11 | ft-flowtron | **KEEP** | The only discoverability surface; 85 lines. Known cost: roster-enumeration drift on every roster change (accepted, and shrinks with consolidation). |
| 12 | ft-stats | **KEEP** (weak) | Read-only, global, zero workflow coupling. Retained on cost grounds; no usage signal either way. |
| 13 | ft-quality | **CUT** (weak confidence) | Function is native to any coding agent ("run lint/typecheck/tests"); not an oversight checkpoint (the positioning); duplicates each project's own commands. Operator veto expected if habitually used. |
| 14 | ft-new-project | **KEEP** | Adoption funnel. |
| 15 | ft-update | **KEEP** | Consumer side of the versioning contract; pairs with ft-release. |
| 16 | ft-release | **KEEP** | Self-only release recipe; the most-exercised complex skill (399 lines, ~15 releases). |
| 17 | ft-worktree-start | **KEEP** (pair) | Unambiguous opt-in convention; a subcommand merge (`/ft-worktree start\|end`) is possible but marginal — no confusion cost today. |
| 18 | ft-worktree-end | **KEEP** (pair) | As above. |
| 19 | ft-audit | **MERGE (survivor)** → `/ft-audit <domain>` | Becomes the one parameterized skill over a pass library. |
| 20 | ft-audit-backend | **MERGE** → pass file | §§3–6 near-verbatim with siblings; distinct content is ~30 lines of pass definitions. |
| 21 | ft-audit-frontend | **MERGE** → pass file | As above. |
| 22 | ft-audit-security | **MERGE** → pass file | As above. |
| 23 | ft-audit-performance | **MERGE** → pass file | As above. |
| 24 | ft-audit-docs | **MERGE** → pass file | As above. |
| 25 | ft-audit-repo | **KEEP** | Genuinely different shape: phased first-contact audit, no fork, global install, epics-and-children output (CORE-309). |
| 26 | ft-audit-context | **KEEP** | Deliberately built outside the family (CORE-186): different audience (AI-context files), conversational output, global install, 4 passes. |

### Cluster verdicts

**(a) Task-entry, 7 → 5.** Fold ft-debug (into ft-task) and ft-sidequest (into ft-file-followup). The surviving five are differentiated by *artifact and lifecycle* — run full / run micro / file starter / file line / run loop — not by fuzzy size adjectives, which is what makes entry points self-evident. `SPEC/tasknote-selection.md` shrinks accordingly (the sidequest-vs-followup block, its longest disambiguation, disappears). The task line's smell diagnosis is confirmed but the cure is two targeted folds, not a single mega-runner: CORE-042.1 already costed the unified-flow rework and judged it non-trivial, and micro/starter/goal carry template- or lifecycle-level distinctions a flag can't absorb cleanly.

**(b) Audit family, 8 → 3 surfaces.** One parameterized `/ft-audit <domain>` + pass library (six pass files), plus ft-audit-repo and ft-audit-context which were never really family members (different shape, different install). The family *started* as a consolidation (CORE-072 merged two InvisiPaw skills into one); CORE-101 re-expanded it with no surviving decision record; CORE-287's overlay template already prototypes run-by-reference + deltas; CORE-289 already capped growth. One skeleton kills the CORE-185 drift class (18 edits / 7 files for one rename) and fixes CORE-328.3's dispatch failure at the root (one description routes all domains). Cost: adopters' existing forks need a migration note at bump time.

**Net roster:** 26 → 18 (−5 audit, −1 debug, −1 sidequest, −1 quality). Post-consolidation an adopter's per-project menu is ~11 bundled skills + opt-in globals — materially closer to spec-kit's ~8 while covering a lifecycle spec-kit doesn't (the honest comparison is per install tier; raw 26-vs-8 overstated the gap).

**CORE-386 coordination confirmed:** Rationalizations / Red Flags sections should target `SPEC/gates.md` + the *consolidated* audit skill (1 file, not 8) — the coordination concern in its task line was warranted.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; no code changed (markdown-only: tasknote + PLAN.md).

- [x] Ran lint/type-check on changed code — `N/A`; no code changed.

- [x] **Quality assertions** — `N/A` for code; for the changed markdown: new PLAN lines follow the canonical task-line grammar, wikilinks are real IDs, and all four descriptions sit under the 50w target.

- [x] (frontend) Asked the user for visual confirmation — `N/A`; no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:** Analysis-only task; the verifiable claims (skill count, line counts, pairwise scaffold diffs, symlink list) were measured directly with `ls` / `wc -l` / `diff` during Discovery and Execution rather than asserted from memory.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 entries **no change**: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`. This task changed no shipped surface — the roster stays at 26 until the [[CORE-389]]/[[CORE-390]]/[[CORE-391]]/[[CORE-392]] follow-ups execute, at which point their closures own the doc updates (roster enumerations, MIGRATION §1.2.1, symlink lists).

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Reviewed all 26 shipped skills (task line said 25 — count drift, reconciled) and delivered a keep/merge/cut verdict per skill: 18 keep, 7 merge, 1 cut, shrinking the roster to 18 if all follow-ups land. The two suspected clusters both confirmed but with different cures: the task-entry seven folds by two targeted merges (ft-debug → `/ft-task --debug`; ft-sidequest → `/ft-file-followup --park`), not a mega-runner; the audit six collapse to one parameterized `/ft-audit <domain>` + pass library (measured: §§3–6 near-verbatim, ~30 distinct lines each), with ft-audit-repo/-context kept as genuine non-members. Filed CORE-389..392 as follow-ups and reconciled CORE-386/387 (count fix + retargeting CORE-386 at the consolidated audit skill). Deliverable is this tasknote (workflow-only closure; no code or shipped docs changed).

**Archived:** 2026-07-31
